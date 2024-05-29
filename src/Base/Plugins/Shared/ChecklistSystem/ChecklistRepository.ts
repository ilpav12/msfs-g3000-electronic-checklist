import {EventBus, Subject, Subscribable, Subscription} from '@microsoft/msfs-sdk';
import {
  AbnormalChecklists,
  ChecklistIdentification,
  EmergencyChecklists,
  NormalChecklists
} from '@base/Shared/ChecklistSystem/Checklists';
import {
  Checklist,
  ChecklistCategory,
  ChecklistItemState,
  ChecklistNames,
  ChecklistReadonly
} from '@base/Shared/ChecklistSystem/Checklist';
import {ChecklistEvents} from '@base/Shared/ChecklistSystem/ChecklistEvents';

/**
 * The Repo class for the checklists.
 */
export class ChecklistRepository {
  private readonly abnormalChecklists = AbnormalChecklists.getChecklists();
  private readonly checklistIdentification = ChecklistIdentification.getChecklists();
  private readonly emergencyChecklists = EmergencyChecklists.getChecklists();
  private readonly normalChecklists = NormalChecklists.getChecklists();
  // crew alerting and performance data checklist currently disabled
  // private readonly crewAlertingChecklists = CrewAlertingChecklists.getChecklists();
  // private readonly performanceDataChecklists = PerformanceDataChecklists.getChecklists();

  private readonly _activeChecklistName = Subject.create(this.normalChecklists[2].name);
  public readonly activeChecklistName = this._activeChecklistName as Subscribable<string>;

  public readonly activeChecklist = this._activeChecklistName.map(this.getChecklistByName.bind(this)) as Subscribable<ChecklistReadonly>;

  public readonly isActiveChecklistComplete = Subject.create(false);
  private isActiveChecklistCompletePipe?: Subscription;

  private readonly incompleteChecklists = new Set<ChecklistNames>();

  private readonly publisher = this.bus.getPublisher<ChecklistEvents>();

  /**
   * Builds the Repo for the checklists.
   * @param bus The event bus.
   */
  public constructor(private readonly bus: EventBus) {
    const sub = this.bus.getSubscriber<ChecklistEvents>();

    this.activeChecklist.sub(activeChecklist => {
      this.isActiveChecklistCompletePipe?.destroy();
      this.isActiveChecklistCompletePipe = activeChecklist.isComplete.pipe(this.isActiveChecklistComplete);
    }, true);

    sub.on('checklist_event').handle(event => {
      switch (event.type) {
        case 'active_checklist_changed':
          this.setActiveChecklist(event.newActiveChecklistName, false);
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
          this.nextChecklistInCategory(event.checklistName, event.category);
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
   * Get the Checklist searched by name.
   * @param name The name of the checklist.
   * @returns The Checklist that holds the given name.
   */
  private getChecklistByName(name: string): Checklist {
    const checklist =
      this.normalChecklists.find(x => x.name === name) ||
      this.abnormalChecklists.find(x => x.name === name) ||
      this.checklistIdentification.find(x => x.name === name) ||
      this.emergencyChecklists.find(x => x.name === name);
    // this.crewAlertingChecklists.find(x => x.name === name) ||
    // this.performanceDataChecklists.find(x => x.name === name);

    return checklist ?? this.normalChecklists[0];
  }

  /**
   * Get the checklists by category.
   * @param category The category of the checklists.
   * @returns The checklists in the given category.
   */
  public getChecklistsByCategory(category: ChecklistCategory): Checklist[] {
    switch (category) {
      case ChecklistCategory.Abnormal:
        return this.abnormalChecklists;
      case ChecklistCategory.ChecklistIdentification:
        return this.checklistIdentification;
      case ChecklistCategory.Emergency:
        return this.emergencyChecklists;
      case ChecklistCategory.Normal:
        return this.normalChecklists;
      // case ChecklistCategory.CrewAlerting:
      //   return this.crewAlertingChecklists;
      // case ChecklistCategory.PerformanceData:
      //   return this.performanceDataChecklists;
    }
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
   * @param notify Whether to send the bus event. Defaults to true.
   */
  public setActiveChecklist(name: ChecklistNames, notify = true): void {
    this._activeChecklistName.set(name);

    if (notify) {
      this.publisher.pub('checklist_event', {
        type: 'active_checklist_changed',
        newActiveChecklistName: this._activeChecklistName.get(),
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
   */
  private nextChecklistInCategory(checklistName: ChecklistNames, category: ChecklistCategory): void {
    switch (category) {
      case ChecklistCategory.Abnormal:
        this.setActiveChecklist(this.findNextChecklist(checklistName, this.abnormalChecklists));
        break;
      case ChecklistCategory.ChecklistIdentification:
        this.setActiveChecklist(this.findNextChecklist(checklistName, this.checklistIdentification));
        break;
      case ChecklistCategory.Emergency:
        this.setActiveChecklist(this.findNextChecklist(checklistName, this.emergencyChecklists));
        break;
      case ChecklistCategory.Normal:
        this.setActiveChecklist(this.findNextChecklist(checklistName, this.normalChecklists));
        break;
      // case ChecklistCategory.CrewAlerting:
      //   this.setActiveChecklist(this.findNextChecklist(checklistName, this.crewAlertingChecklists));
      //   break;
      // case ChecklistCategory.PerformanceData:
      //   this.setActiveChecklist(this.findNextChecklist(checklistName, this.performanceDataChecklists));
      //   break;
    }
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
    switch (category) {
      case ChecklistCategory.Abnormal:
        this.abnormalChecklists.forEach(x => this.resetChecklist(x.name));
        break;
      case ChecklistCategory.ChecklistIdentification:
        this.checklistIdentification.forEach(x => this.resetChecklist(x.name));
        break;
      case ChecklistCategory.Emergency:
        this.emergencyChecklists.forEach(x => this.resetChecklist(x.name));
        break;
      case ChecklistCategory.Normal:
        this.normalChecklists.forEach(x => this.resetChecklist(x.name));
        break;
      // case ChecklistCategory.CrewAlerting:
      //   this.crewAlertingChecklists.forEach(x => this.resetChecklist(x.name));
      //   break;
      // case ChecklistCategory.PerformanceData:
      //   this.performanceDataChecklists.forEach(x => this.resetChecklist(x.name));
      //   break;
    }
  }

  /** Resets all checklists. */
  public resetAllChecklists(): void {
    this.abnormalChecklists.forEach(x => this.resetChecklist(x.name));
    this.checklistIdentification.forEach(x => this.resetChecklist(x.name));
    this.emergencyChecklists.forEach(x => this.resetChecklist(x.name));
    this.normalChecklists.forEach(x => this.resetChecklist(x.name));
    // this.crewAlertingChecklists.forEach(x => this.resetChecklist(x.name));
    // this.performanceDataChecklists.forEach(x => this.resetChecklist(x.name));
  }
}
