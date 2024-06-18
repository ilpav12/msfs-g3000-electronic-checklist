import {EventBus, Subject, Subscribable} from '@microsoft/msfs-sdk';
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

/**
 * The Repo class for the checklists.
 */
export class ChecklistRepository<Names = ChecklistNames, Category = ChecklistCategory> {
  private readonly _activeChecklist = Subject.create({
    leftPfd: this.defaultChecklist,
    leftMfd: this.defaultChecklist,
    rightMfd: this.defaultChecklist,
    rightPfd: this.defaultChecklist,
  });
  public readonly activeChecklist = this._activeChecklist as Subscribable<{
    leftPfd: ChecklistReadonly<Names, Category>,
    leftMfd: ChecklistReadonly<Names, Category>,
    rightMfd: ChecklistReadonly<Names, Category>,
    rightPfd: ChecklistReadonly<Names, Category>,
  }>;

  private readonly incompleteChecklists = new Set<Checklist<Names, Category>>();

  private readonly publisher = this.bus.getPublisher<ChecklistEvents<Names, Category>>();

  /**
   * Builds the Repo for the checklists.
   * @param bus The event bus.
   * @param checklists All the checklists available.
   * @param defaultChecklist The default checklist.
   */
  public constructor(
    private readonly bus: EventBus,
    private readonly checklists: Checklist<Names, Category>[],
    public readonly defaultChecklist: Checklist<Names, Category>,
  ) {
    const sub = this.bus.getSubscriber<ChecklistEvents<Names, Category>>();

    sub.on('checklist_event').handle(event => {
      switch (event.type) {
        case 'active_checklist_changed':
          this.setActiveChecklist(event.newActiveChecklistName, event.newActiveChecklistCategory, event.targetPaneIndex, false);
          break;
        case 'checklist_reset':
          this.resetChecklist(event.checklistName, event.checklistCategory, false);
          break;
        case "all_checklists_reset":
          this.resetAllChecklists();
          break;
        case 'item_changed':
          this.setChecklistItemState(event.checklistName, event.checklistCategory, event.itemIndex, event.itemState, false);
          break;
        case 'check_all_items':
          this.checkAllItems(event.checklistName, event.checklistCategory, false);
          break;
        case 'next_checklist':
          this.nextChecklistInCategory(event.checklistName, event.checklistCategory, event.targetPaneIndex);
          break;
      }
    });
  }

  /**
   * Get a list of all the categories of the checklists.
   * @returns The categories of the checklists.
   */
  public getChecklistCategories(): Category[] {
    return Array.from(new Set(this.checklists.map(x => x.category)));
  }

  /**
   * Get the active checklist by pane index.
   * @param paneIndex The index of the pane.
   * @returns The active checklist.
   */
  public getActiveChecklistByPaneIndex(paneIndex: ControllableDisplayPaneIndex): Subscribable<ChecklistReadonly<Names, Category>> {
    switch (paneIndex) {
      case DisplayPaneIndex.LeftPfd:
        return this.activeChecklist.map(x => x.leftPfd);
      case DisplayPaneIndex.LeftMfd:
        return this.activeChecklist.map(x => x.leftMfd);
      case DisplayPaneIndex.RightMfd:
        return this.activeChecklist.map(x => x.rightMfd);
      case DisplayPaneIndex.RightPfd:
        return this.activeChecklist.map(x => x.rightPfd);
    }
  }

  /**
   * Get the Checklist searched by name and category.
   * @param name The name of the checklist.
   * @param category The category of the checklist.
   * @returns The Checklist that holds the given name and category.
   */
  private getChecklistByNameAndCategory(name: Names, category: Category): Checklist<Names, Category> {
    const checklist = this.checklists.find(x => x.name === name && x.category === category);

    return checklist ?? this.defaultChecklist;
  }

  /**
   * Get the checklists by category.
   * @param category The category of the checklists.
   * @returns The checklists in the given category.
   */
  public getChecklistsByCategory(category: Category): Checklist<Names, Category>[] {
    return this.checklists.filter(x => x.category === category);
  }

  /**
   * Sets the new active checklist and sends the bus event.
   * @param name Name of new active checklist.
   * @param category Category of new active checklist.
   * @param targetPaneIndex The index of the target pane.
   * @param notify Whether to send the bus event. Defaults to true.
   */
  public setActiveChecklist(
    name: Names,
    category: Category,
    targetPaneIndex: ControllableDisplayPaneIndex,
    notify = true
  ): void {
    switch (targetPaneIndex) {
      case DisplayPaneIndex.LeftPfd:
        this._activeChecklist.set({
          ...this._activeChecklist.get(),
          leftPfd: this.getChecklistByNameAndCategory(name, category),
        });
        break;
      case DisplayPaneIndex.LeftMfd:
        this._activeChecklist.set({
          ...this._activeChecklist.get(),
          leftMfd: this.getChecklistByNameAndCategory(name, category),
        });
        break;
      case DisplayPaneIndex.RightMfd:
        this._activeChecklist.set({
          ...this._activeChecklist.get(),
          rightMfd: this.getChecklistByNameAndCategory(name, category),
        });
        break;
      case DisplayPaneIndex.RightPfd:
        this._activeChecklist.set({
          ...this._activeChecklist.get(),
          rightPfd: this.getChecklistByNameAndCategory(name, category),
        });
        break;
    }

    if (notify) {
      this.publisher.pub('checklist_event', {
        type: 'active_checklist_changed',
        newActiveChecklistName: name,
        newActiveChecklistCategory: category,
        targetPaneIndex: targetPaneIndex,
      }, true);
    }
  }

  /**
   * Sets the new active checklist and sends the bus event.
   * @param checklistName The name of the checklist containing the item.
   * @param checklistCategory The category of the checklist containing the item.
   * @param itemIndex The item index.
   * @param itemState The new item state.
   * @param notify Whether to send the bus event. Defaults to true.
   */
  public setChecklistItemState(checklistName: Names, checklistCategory: Category, itemIndex: number, itemState: ChecklistItemState, notify = true): void {
    const checklist = this.getChecklistByNameAndCategory(checklistName, checklistCategory);
    checklist.items[itemIndex].state.set(itemState);
    const anyItemChecked = checklist.items.some(x => x.state.get() === ChecklistItemState.Completed);
    if (anyItemChecked && !checklist.isComplete.get()) {
      this.incompleteChecklists.add(checklist);
    } else {
      this.incompleteChecklists.delete(checklist);
    }

    if (notify) {
      this.publisher.pub('checklist_event', {
        type: 'item_changed',
        checklistName,
        checklistCategory,
        itemIndex,
        itemState,
      }, true);
    }
  }

  /**
   * Sets all the items in the active checklist to the given state.
   * @param checklistName The name of the checklist.
   * @param checklistCategory The category of the checklist.
   * @param notify Whether to send the bus event. Defaults to true.
   */
  public checkAllItems(checklistName: Names, checklistCategory: Category, notify = true): void {
    const checklist = this.getChecklistByNameAndCategory(checklistName, checklistCategory);
    checklist.items.forEach(x => x.state.set(ChecklistItemState.Completed));

    if (notify) {
      this.publisher.pub('checklist_event', {
        type: 'check_all_items',
        checklistName,
        checklistCategory,
      }, true);
    }
  }

  /**
   * Changes the active checklist to the next checklist in the category.
   * @param checklistName The name of the current checklist.
   * @param checklistCategory The category of the current checklist.
   * @param targetPaneIndex The index of the target pane.
   */
  private nextChecklistInCategory(checklistName: Names, checklistCategory: Category, targetPaneIndex: ControllableDisplayPaneIndex): void {
    const nextChecklist = this.findNextChecklist(checklistName, checklistCategory, this.getChecklistsByCategory(checklistCategory));
    this.setActiveChecklist(nextChecklist.name, nextChecklist.category, targetPaneIndex);
  }

  /**
   * Utility function to find the next checklist in an array of checklists.
   * @param currentName The name of the current checklist.
   * @param currentCategory The category of the current checklist.
   * @param checklists The array of checklists.
   * @returns The next checklist, or if there is none, the last checklist.
   */
  private findNextChecklist(currentName: Names, currentCategory: Category, checklists: Checklist<Names, Category>[]): Checklist<Names, Category> {
    const currentChecklistIndex = checklists.findIndex(x => x.name === currentName && x.category === currentCategory);
    // Find the next checklists, or if there is none, the last checklist.
    return checklists[currentChecklistIndex + 1] ?? checklists[checklists.length - 1];
  }

  /**
   * Resets all items in a checklist to incomplete.
   * @param checklistName The checklist name.
   * @param checklistCategory The category of the checklist.
   * @param notify Whether to send the bus event. Defaults to true.
   */
  public resetChecklist(checklistName: Names, checklistCategory: Category, notify = true): void {
    const checklist = this.getChecklistByNameAndCategory(checklistName, checklistCategory);
    checklist.items.forEach(x => x.state.set(ChecklistItemState.Incomplete));

    if (notify) {
      this.publisher.pub('checklist_event', {
        type: 'checklist_reset',
        checklistName,
        checklistCategory,
      }, true);
    }
  }

  /** Resets all checklists in the given category
   * @param category The category to reset.
   */
  public resetChecklistByCategory(category: Category): void {
    this.getChecklistsByCategory(category).forEach(x => this.resetChecklist(x.name, x.category));
  }

  /** Resets all checklists. */
  public resetAllChecklists(): void {
    this.checklists.forEach(x => this.resetChecklist(x.name, x.category));
  }
}
