import {EventBus, Subject, Subscribable, Subscription} from '@microsoft/msfs-sdk';
import {
  ControllableDisplayPaneIndex,
  DisplayPaneIndex
} from "@microsoft/msfs-wtg3000-common";
import {BaseChecklistRepository, ChecklistItemState} from "@base/Shared/ChecklistSystem";
import {TbmChecklist, TbmChecklistCategory, TbmChecklistNames, TbmChecklistReadonly} from "./TbmChecklist";
import {TbmChecklistEvents} from "./TbmChecklistEvents";

/**
 * The Repo class for the checklists.
 */
export class TbmChecklistRepository implements BaseChecklistRepository<TbmChecklistNames, TbmChecklistReadonly, TbmChecklist, TbmChecklistCategory> {
  private readonly _activeChecklistNameLeftPfd = Subject.create(this.defaultChecklist.name);
  public readonly activeChecklistNameLeftPfd = this._activeChecklistNameLeftPfd as Subscribable<TbmChecklistNames>;
  public readonly activeChecklistLeftPfd = this._activeChecklistNameLeftPfd.map(this.getChecklistByName.bind(this)) as Subscribable<TbmChecklistReadonly>;

  private readonly _activeChecklistNameLeftMfd = Subject.create(this.defaultChecklist.name);
  public readonly activeChecklistNameLeftMfd = this._activeChecklistNameLeftMfd as Subscribable<TbmChecklistNames>;
  public readonly activeChecklistLeftMfd = this._activeChecklistNameLeftMfd.map(this.getChecklistByName.bind(this)) as Subscribable<TbmChecklistReadonly>;

  private readonly _activeChecklistNameRightMfd = Subject.create(this.defaultChecklist.name);
  public readonly activeChecklistNameRightMfd = this._activeChecklistNameRightMfd as Subscribable<TbmChecklistNames>;
  public readonly activeChecklistRightMfd = this._activeChecklistNameRightMfd.map(this.getChecklistByName.bind(this)) as Subscribable<TbmChecklistReadonly>;

  private readonly _activeChecklistNameRightPfd = Subject.create(this.defaultChecklist.name);
  public readonly activeChecklistNameRightPfd = this._activeChecklistNameRightPfd as Subscribable<TbmChecklistNames>;
  public readonly activeChecklistRightPfd = this._activeChecklistNameRightPfd.map(this.getChecklistByName.bind(this)) as Subscribable<TbmChecklistReadonly>;

  public readonly isActiveChecklistLeftPfdComplete = Subject.create(false);
  private isActiveChecklistLeftPfdCompletePipe?: Subscription;

  public readonly isActiveChecklistLeftMfdComplete = Subject.create(false);
  private isActiveChecklistLeftMfdCompletePipe?: Subscription;

  public readonly isActiveChecklistRightMfdComplete = Subject.create(false);
  private isActiveChecklistRightMfdCompletePipe?: Subscription;

  public readonly isActiveChecklistRightPfdComplete = Subject.create(false);
  private isActiveChecklistRightPfdCompletePipe?: Subscription;

  private readonly incompleteChecklists = new Set<TbmChecklistNames>();

  private readonly publisher = this.bus.getPublisher<TbmChecklistEvents>();

  /**
   * Builds the Repo for the checklists.
   * @param bus The event bus.
   * @param checklists All the checklists available.
   * @param defaultChecklist The default checklist.
   */
  public constructor(
    private readonly bus: EventBus,
    private readonly checklists: TbmChecklist[],
    public readonly defaultChecklist: TbmChecklist,
  ) {
    const sub = this.bus.getSubscriber<TbmChecklistEvents>();

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
  public get incompleteChecklistNames(): TbmChecklistNames[] {
    return [...this.incompleteChecklists].sort((a, b) => {
      const categories = Object.values(TbmChecklistCategory);
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
  public getActiveChecklistByPaneIndex(paneIndex: ControllableDisplayPaneIndex): Subscribable<TbmChecklistReadonly> {
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
  public getActiveChecklistNameByPaneIndex(paneIndex: ControllableDisplayPaneIndex): Subscribable<TbmChecklistNames> {
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
  private getChecklistByName(name: string): TbmChecklist {
    const checklist = this.checklists.find(x => x.name === name);

    return checklist ?? this.defaultChecklist;
  }

  /**
   * Get the checklists by category.
   * @param category The category of the checklists.
   * @returns The checklists in the given category.
   */
  public getChecklistsByCategory(category: TbmChecklistCategory): TbmChecklist[] {
    return this.checklists.filter(x => x.category === category);
  }

  /**
   * Get the readonly Checklist searched by name.
   * @param name The name of the checklist.
   * @returns The readonly Checklist that holds the given name.
   */
  public getReadonlyChecklistByName(name: TbmChecklistNames): TbmChecklistReadonly {
    return this.getChecklistByName(name) as TbmChecklistReadonly;
  }

  /**
   * Sets the new active checklist and sends the bus event.
   * @param name Name of new active checklist.
   * @param targetPaneIndex The index of the target pane.
   * @param notify Whether to send the bus event. Defaults to true.
   */
  public setActiveChecklist(name: TbmChecklistNames, targetPaneIndex: ControllableDisplayPaneIndex | -1, notify = true): void {
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
  public setChecklistItemState(checklistName: TbmChecklistNames, itemIndex: number, itemState: ChecklistItemState, notify = true): void {
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
  public checkAllItems(checklistName: TbmChecklistNames, notify = true): void {
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
  private nextChecklistInCategory(checklistName: TbmChecklistNames, category: TbmChecklistCategory, targetPaneIndex: ControllableDisplayPaneIndex | -1): void {
    this.setActiveChecklist(this.findNextChecklist(checklistName, this.getChecklistsByCategory(category)), targetPaneIndex);
  }

  /**
   * Utility function to find the next checklist in an array of checklists.
   * @param currentName The name of the current checklist.
   * @param checklists The array of checklists.
   * @returns The name of the next checklist, or if there is none, the last checklist.
   */
  private findNextChecklist(currentName: TbmChecklistNames, checklists: TbmChecklist[]): TbmChecklistNames {
    const currentChecklistIndex = checklists.findIndex(x => x.name === currentName);
    // Find the next checklists, or if there is none, the last checklist.
    return checklists[currentChecklistIndex + 1]?.name ?? checklists[checklists.length - 1].name;
  }

  /**
   * Resets all items in a checklist to incomplete.
   * @param checklistName The checklist name.
   * @param notify Whether to send the bus event. Defaults to true.
   */
  public resetChecklist(checklistName: TbmChecklistNames, notify = true): void {
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
  public resetChecklistByCategory(category: TbmChecklistCategory): void {
    this.getChecklistsByCategory(category).forEach(x => this.resetChecklist(x.name));
  }

  /** Resets all checklists. */
  public resetAllChecklists(): void {
    this.checklists.forEach(x => this.resetChecklist(x.name));
  }
}
