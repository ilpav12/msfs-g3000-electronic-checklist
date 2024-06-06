import {EventBus, Subject, Subscribable, Subscription} from '@microsoft/msfs-sdk';
import {
  ControllableDisplayPaneIndex,
  DisplayPaneIndex
} from "@microsoft/msfs-wtg3000-common";
import {
  Checklist,
  ChecklistCategory,
  ChecklistNames,
  ChecklistReadonly
} from '@base/Shared/ChecklistSystem/Checklist';
import {ChecklistItemState} from "@base/Shared/ChecklistSystem/ChecklistItem";
import {ChecklistEvents} from '@base/Shared/ChecklistSystem/ChecklistEvents';

export interface BaseChecklistRepository<T, U, V, K> {
  activeChecklistNameLeftPfd: Subscribable<T>;
  activeChecklistLeftPfd: Subscribable<U>;
  activeChecklistNameLeftMfd: Subscribable<T>;
  activeChecklistLeftMfd: Subscribable<U>;
  activeChecklistNameRightMfd: Subscribable<T>;
  activeChecklistRightMfd: Subscribable<U>;
  activeChecklistNameRightPfd: Subscribable<T>;
  activeChecklistRightPfd: Subscribable<U>;
  isActiveChecklistLeftPfdComplete: Subscribable<boolean>;
  isActiveChecklistLeftMfdComplete: Subscribable<boolean>;
  isActiveChecklistRightMfdComplete: Subscribable<boolean>;
  isActiveChecklistRightPfdComplete: Subscribable<boolean>;
  incompleteChecklistNames: T[];
  getActiveChecklistByPaneIndex(paneIndex: ControllableDisplayPaneIndex): Subscribable<U>;
  getActiveChecklistNameByPaneIndex(paneIndex: ControllableDisplayPaneIndex): Subscribable<T>;
  getIsActiveChecklistCompleteByPaneIndex(paneIndex: ControllableDisplayPaneIndex): Subscribable<boolean>;
  getChecklistsByCategory(category: K): V[];
  getReadonlyChecklistByName(name: T): U;
  setActiveChecklist(name: T, targetPaneIndex: ControllableDisplayPaneIndex | -1, notify?: boolean): void;
  setChecklistItemState(checklistName: T, itemIndex: number, itemState: ChecklistItemState, notify?: boolean): void;
  checkAllItems(checklistName: T, notify?: boolean): void;
  resetChecklist(checklistName: T, notify?: boolean): void;
  resetChecklistByCategory(category: K): void;
  resetAllChecklists(): void;
}

/**
 * The Repo class for the checklists.
 */
export class ChecklistRepository implements BaseChecklistRepository<ChecklistNames, ChecklistReadonly, Checklist, ChecklistCategory>{
  private readonly _activeChecklistNameLeftPfd = Subject.create(this.defaultChecklist.name);
  public readonly activeChecklistNameLeftPfd = this._activeChecklistNameLeftPfd as Subscribable<ChecklistNames>;
  public readonly activeChecklistLeftPfd = this._activeChecklistNameLeftPfd.map(this.getChecklistByName.bind(this)) as Subscribable<ChecklistReadonly>;

  private readonly _activeChecklistNameLeftMfd = Subject.create(this.defaultChecklist.name);
  public readonly activeChecklistNameLeftMfd = this._activeChecklistNameLeftMfd as Subscribable<ChecklistNames>;
  public readonly activeChecklistLeftMfd = this._activeChecklistNameLeftMfd.map(this.getChecklistByName.bind(this)) as Subscribable<ChecklistReadonly>;

  private readonly _activeChecklistNameRightMfd = Subject.create(this.defaultChecklist.name);
  public readonly activeChecklistNameRightMfd = this._activeChecklistNameRightMfd as Subscribable<ChecklistNames>;
  public readonly activeChecklistRightMfd = this._activeChecklistNameRightMfd.map(this.getChecklistByName.bind(this)) as Subscribable<ChecklistReadonly>;

  private readonly _activeChecklistNameRightPfd = Subject.create(this.defaultChecklist.name);
  public readonly activeChecklistNameRightPfd = this._activeChecklistNameRightPfd as Subscribable<ChecklistNames>;
  public readonly activeChecklistRightPfd = this._activeChecklistNameRightPfd.map(this.getChecklistByName.bind(this)) as Subscribable<ChecklistReadonly>;

  public readonly isActiveChecklistLeftPfdComplete = Subject.create(false);
  private isActiveChecklistLeftPfdCompletePipe?: Subscription;

  public readonly isActiveChecklistLeftMfdComplete = Subject.create(false);
  private isActiveChecklistLeftMfdCompletePipe?: Subscription;

  public readonly isActiveChecklistRightMfdComplete = Subject.create(false);
  private isActiveChecklistRightMfdCompletePipe?: Subscription;

  public readonly isActiveChecklistRightPfdComplete = Subject.create(false);
  private isActiveChecklistRightPfdCompletePipe?: Subscription;

  private readonly incompleteChecklists = new Set<ChecklistNames>();

  private readonly publisher = this.bus.getPublisher<ChecklistEvents>();

  /**
   * Builds the Repo for the checklists.
   * @param bus The event bus.
   * @param checklists All the checklists available.
   * @param defaultChecklist The default checklist.
   */
  public constructor(
    private readonly bus: EventBus,
    private readonly checklists: Checklist[],
    public readonly defaultChecklist: Checklist,
  ) {
    const sub = this.bus.getSubscriber<ChecklistEvents>();

    this.activeChecklistLeftPfd.sub(activeChecklist => {
      this.isActiveChecklistLeftPfdCompletePipe?.destroy();
      this.isActiveChecklistLeftPfdCompletePipe = activeChecklist.isComplete.pipe(this.isActiveChecklistLeftPfdComplete);
    }, true);

    this.activeChecklistLeftMfd.sub(activeChecklist => {
      this.isActiveChecklistLeftMfdCompletePipe?.destroy();
      this.isActiveChecklistLeftMfdCompletePipe = activeChecklist.isComplete.pipe(this.isActiveChecklistLeftMfdComplete);
    }, true);

    this.activeChecklistRightMfd.sub(activeChecklist => {
      this.isActiveChecklistRightMfdCompletePipe?.destroy();
      this.isActiveChecklistRightMfdCompletePipe = activeChecklist.isComplete.pipe(this.isActiveChecklistRightMfdComplete);
    }, true);

    this.activeChecklistRightPfd.sub(activeChecklist => {
      this.isActiveChecklistRightPfdCompletePipe?.destroy();
      this.isActiveChecklistRightPfdCompletePipe = activeChecklist.isComplete.pipe(this.isActiveChecklistRightPfdComplete);
    }, true);

    sub.on('checklist_event').handle(event => {
      switch (event.type) {
        case 'active_checklist_changed':
          this.setActiveChecklist(event.newActiveChecklistName, event.targetPaneIndex, false);
          break;
        case 'checklist_reset':
          this.resetChecklist(event.checklistName, false);
          break;
        case "all_checklists_reset":
          this.resetAllChecklists();
          break;
        case 'item_changed':
          this.setChecklistItemState(event.checklistName, event.itemIndex, event.itemState, false);
          break;
        case 'check_all_items':
          this.checkAllItems(event.checklistName, false);
          break;
        case 'next_checklist':
          this.nextChecklistInCategory(event.checklistName, event.category, event.targetPaneIndex);
          break;
      }
    });
  }

  /**
   * Get the names of the incomplete checklists sorted by category order then checklist order as they appear in lists.
   * @returns The names of the incomplete checklists.
   */
  public get incompleteChecklistNames(): ChecklistNames[] {
    return [...this.incompleteChecklists].sort((a, b) => {
      const categories = Object.values(ChecklistCategory);
      const categoryNameA = this.getReadonlyChecklistByName(a).category;
      const categoryNameB = this.getReadonlyChecklistByName(b).category;
      const categoryIndexA = categories.indexOf(categoryNameA);
      const categoryIndexB = categories.indexOf(categoryNameB);
      if (categoryIndexA !== categoryIndexB) {
        return categoryIndexA - categoryIndexB;
      }
      const checklists = this.getChecklistsByCategory(categoryNameB);
      const indexA = checklists.findIndex(cl => cl.name === a);
      const indexB = checklists.findIndex(cl => cl.name === b);
      return indexA - indexB;
    });
  }

  /**
   * Get the active checklist by pane index.
   * @param paneIndex The index of the pane.
   * @returns The active checklist.
   */
  public getActiveChecklistByPaneIndex(paneIndex: ControllableDisplayPaneIndex): Subscribable<ChecklistReadonly> {
    switch (paneIndex) {
      case DisplayPaneIndex.LeftPfd:
        return this.activeChecklistLeftPfd;
      case DisplayPaneIndex.LeftMfd:
        return this.activeChecklistLeftMfd;
      case DisplayPaneIndex.RightMfd:
        return this.activeChecklistRightMfd;
      case DisplayPaneIndex.RightPfd:
        return this.activeChecklistRightPfd;
    }
  }

  /**
   * Get the active checklist name by pane index.
   * @param paneIndex The index of the pane.
   * @returns The active checklist name.
   */
  public getActiveChecklistNameByPaneIndex(paneIndex: ControllableDisplayPaneIndex): Subscribable<ChecklistNames> {
    switch (paneIndex) {
      case DisplayPaneIndex.LeftPfd:
        return this.activeChecklistNameLeftPfd;
      case DisplayPaneIndex.LeftMfd:
        return this.activeChecklistNameLeftMfd;
      case DisplayPaneIndex.RightMfd:
        return this.activeChecklistNameRightMfd;
      case DisplayPaneIndex.RightPfd:
        return this.activeChecklistNameRightPfd;
    }
  }

  /**
   * Get the active checklist completion state by pane index.
   * @param paneIndex The index of the pane.
   * @returns The active checklist completion state.
   */
  public getIsActiveChecklistCompleteByPaneIndex(paneIndex: ControllableDisplayPaneIndex): Subscribable<boolean> {
    switch (paneIndex) {
      case DisplayPaneIndex.LeftPfd:
        return this.isActiveChecklistLeftPfdComplete;
      case DisplayPaneIndex.LeftMfd:
        return this.isActiveChecklistLeftMfdComplete;
      case DisplayPaneIndex.RightMfd:
        return this.isActiveChecklistRightMfdComplete;
      case DisplayPaneIndex.RightPfd:
        return this.isActiveChecklistRightPfdComplete;
    }
  }

  /**
   * Get the Checklist searched by name.
   * @param name The name of the checklist.
   * @returns The Checklist that holds the given name.
   */
  private getChecklistByName(name: string): Checklist {
    const checklist = this.checklists.find(x => x.name === name);

    return checklist ?? this.defaultChecklist;
  }

  /**
   * Get the checklists by category.
   * @param category The category of the checklists.
   * @returns The checklists in the given category.
   */
  public getChecklistsByCategory(category: ChecklistCategory): Checklist[] {
    return this.checklists.filter(x => x.category === category);
  }

  /**
   * Get the readonly Checklist searched by name.
   * @param name The name of the checklist.
   * @returns The readonly Checklist that holds the given name.
   */
  public getReadonlyChecklistByName(name: ChecklistNames): ChecklistReadonly {
    return this.getChecklistByName(name) as ChecklistReadonly;
  }

  /**
   * Sets the new active checklist and sends the bus event.
   * @param name Name of new active checklist.
   * @param targetPaneIndex The index of the target pane.
   * @param notify Whether to send the bus event. Defaults to true.
   */
  public setActiveChecklist(name: ChecklistNames, targetPaneIndex: ControllableDisplayPaneIndex | -1, notify = true): void {
    switch (targetPaneIndex) {
      case DisplayPaneIndex.LeftPfd:
        this._activeChecklistNameLeftPfd.set(name);
        break;
      case DisplayPaneIndex.LeftMfd:
        this._activeChecklistNameLeftMfd.set(name);
        break;
      case DisplayPaneIndex.RightMfd:
        this._activeChecklistNameRightMfd.set(name);
        break;
      case DisplayPaneIndex.RightPfd:
        this._activeChecklistNameRightPfd.set(name);
        break;
    }

    if (notify) {
      this.publisher.pub('checklist_event', {
        type: 'active_checklist_changed',
        newActiveChecklistName: name,
        targetPaneIndex: targetPaneIndex,
      }, true);
    }
  }

  /**
   * Sets the new active checklist and sends the bus event.
   * @param checklistName The name of the checklist containing the item.
   * @param itemIndex The item index.
   * @param itemState The new item state.
   * @param notify Whether to send the bus event. Defaults to true.
   */
  public setChecklistItemState(checklistName: ChecklistNames, itemIndex: number, itemState: ChecklistItemState, notify = true): void {
    const checklist = this.getChecklistByName(checklistName);
    checklist.items[itemIndex].state.set(itemState);
    const anyItemChecked = checklist.items.some(x => x.state.get() === ChecklistItemState.Completed);
    if (anyItemChecked && !checklist.isComplete.get()) {
      this.incompleteChecklists.add(checklistName);
    } else {
      this.incompleteChecklists.delete(checklistName);
    }

    if (notify) {
      this.publisher.pub('checklist_event', {
        type: 'item_changed',
        checklistName,
        itemIndex,
        itemState,
      }, true);
    }
  }

  /**
   * Sets all the items in the active checklist to the given state.
   * @param checklistName The name of the checklist.
   * @param notify Whether to send the bus event. Defaults to true.
   */
  public checkAllItems(checklistName: ChecklistNames, notify = true): void {
    const checklist = this.getChecklistByName(checklistName);
    checklist.items.forEach(x => x.state.set(ChecklistItemState.Completed));

    if (notify) {
      this.publisher.pub('checklist_event', {
        type: 'check_all_items',
        checklistName,
      }, true);
    }
  }

  /**
   * Changes the active checklist to the next checklist in the category.
   * @param checklistName The name of the current checklist.
   * @param category The category of the current checklist.
   * @param targetPaneIndex The index of the target pane.
   */
  private nextChecklistInCategory(checklistName: ChecklistNames, category: ChecklistCategory, targetPaneIndex: ControllableDisplayPaneIndex | -1): void {
    this.setActiveChecklist(this.findNextChecklist(checklistName, this.getChecklistsByCategory(category)), targetPaneIndex);
  }

  /**
   * Utility function to find the next checklist in an array of checklists.
   * @param currentName The name of the current checklist.
   * @param checklists The array of checklists.
   * @returns The name of the next checklist, or if there is none, the last checklist.
   */
  private findNextChecklist(currentName: ChecklistNames, checklists: Checklist[]): ChecklistNames {
    const currentChecklistIndex = checklists.findIndex(x => x.name === currentName);
    // Find the next checklists, or if there is none, the last checklist.
    return checklists[currentChecklistIndex + 1]?.name ?? checklists[checklists.length - 1].name;
  }

  /**
   * Resets all items in a checklist to incomplete.
   * @param checklistName The checklist name.
   * @param notify Whether to send the bus event. Defaults to true.
   */
  public resetChecklist(checklistName: ChecklistNames, notify = true): void {
    const checklist = this.getChecklistByName(checklistName);
    checklist.items.forEach(x => x.state.set(ChecklistItemState.Incomplete));

    if (notify) {
      this.publisher.pub('checklist_event', {
        type: 'checklist_reset',
        checklistName,
      }, true);
    }
  }

  /** Resets all checklists in the given category
   * @param category The category to reset.
   */
  public resetChecklistByCategory(category: ChecklistCategory): void {
    this.getChecklistsByCategory(category).forEach(x => this.resetChecklist(x.name));
  }

  /** Resets all checklists. */
  public resetAllChecklists(): void {
    this.checklists.forEach(x => this.resetChecklist(x.name));
  }
}
