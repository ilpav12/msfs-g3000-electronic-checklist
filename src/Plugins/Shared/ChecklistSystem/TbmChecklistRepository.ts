import { EventBus, Subject, Subscribable, Subscription } from '@microsoft/msfs-sdk';

import { TbmAbnormalChecklists, TbmChecklistIdentification, TbmEmergencyChecklists, TbmNormalChecklists } from './Checklists';
import { TbmChecklist, TbmChecklistCategory, TbmChecklistItemState, TbmChecklistNames, TbmChecklistReadonly } from './TbmChecklist';
import { TbmChecklistEvents } from './TbmChecklistEvents';

/**
 * The Repo class for the checklists.
 */
export class TbmChecklistRepository {
  private readonly abnormalChecklists = TbmAbnormalChecklists.getChecklists();
  private readonly checklistIdentification = TbmChecklistIdentification.getChecklists();
  private readonly emergencyChecklists = TbmEmergencyChecklists.getChecklists();
  private readonly normalChecklists = TbmNormalChecklists.getChecklists();
  // crew alerting and performance data checklist currently disabled
  // private readonly crewAlertingChecklists = TbmCrewAlertingChecklists.getChecklists();
  // private readonly performanceDataChecklists = TbmPerformanceDataChecklists.getChecklists();

  private readonly _activeChecklistName = Subject.create(this.normalChecklists[2].name);
  public readonly activeChecklistName = this._activeChecklistName as Subscribable<string>;

  public readonly activeChecklist = this._activeChecklistName.map(this.getChecklistByName.bind(this)) as Subscribable<TbmChecklistReadonly>;

  public readonly isActiveChecklistComplete = Subject.create(false);
  private isActiveChecklistCompletePipe?: Subscription;

  private readonly incompleteChecklists = new Set<TbmChecklistNames>();

  private readonly publisher = this.bus.getPublisher<TbmChecklistEvents>();

  /**
   * Builds the Repo for the checklists.
   * @param bus The event bus.
   */
  public constructor(private readonly bus: EventBus) {
    const sub = this.bus.getSubscriber<TbmChecklistEvents>();

    this.activeChecklist.sub(activeChecklist => {
      this.isActiveChecklistCompletePipe?.destroy();
      this.isActiveChecklistCompletePipe = activeChecklist.isComplete.pipe(this.isActiveChecklistComplete);
    }, true);

    sub.on('Tbm_checklist_event').handle(event => {
      switch (event.type) {
        case 'active_checklist_changed':
          this.setActiveChecklist(event.newActiveChecklistName, false);
          break;
        case 'checklist_reset':
          this.resetChecklist(event.checklistName, false);
          break;
        case 'item_changed':
          this.setChecklistItemState(event.checklistName, event.itemIndex, event.itemState, false);
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
     * Get the Checklist searched by name.
     * @param name The name of the checklist.
     * @returns The Checklist that holds the given name.
     */
  private getChecklistByName(name: string): TbmChecklist {
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
  public getChecklistsByCategory(category: TbmChecklistCategory): TbmChecklist[] {
    switch (category) {
      case TbmChecklistCategory.Abnormal:
        return this.abnormalChecklists;
      case TbmChecklistCategory.ChecklistIdentification:
        return this.checklistIdentification;
      case TbmChecklistCategory.Emergency:
        return this.emergencyChecklists;
      case TbmChecklistCategory.Normal:
        return this.normalChecklists;
      // case TbmChecklistCategory.CrewAlerting:
      //   return this.crewAlertingChecklists;
      // case TbmChecklistCategory.PerformanceData:
      //   return this.performanceDataChecklists;
    }
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
   * @param notify Whether to send the bus event. Defaults to true.
   */
  public setActiveChecklist(name: TbmChecklistNames, notify = true): void {
    this._activeChecklistName.set(name);

    if (notify) {
      this.publisher.pub('Tbm_checklist_event', {
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
  public setChecklistItemState(checklistName: TbmChecklistNames, itemIndex: number, itemState: TbmChecklistItemState, notify = true): void {
    const checklist = this.getChecklistByName(checklistName);
    checklist.items[itemIndex].state.set(itemState);
    const anyItemChecked = checklist.items.some(x => x.state.get() === TbmChecklistItemState.Completed);
    if (anyItemChecked && !checklist.isComplete.get()) {
      this.incompleteChecklists.add(checklistName);
    } else {
      this.incompleteChecklists.delete(checklistName);
    }

    if (notify) {
      this.publisher.pub('Tbm_checklist_event', {
        type: 'item_changed',
        checklistName,
        itemIndex,
        itemState,
      }, true);
    }
  }

  /**
   * Changes the active checklist to the next checklist in the category.
   * @param checklistName The name of the current checklist.
   * @param category The category of the current checklist.
   */
  private nextChecklistInCategory(checklistName: TbmChecklistNames, category: TbmChecklistCategory): void {
    switch (category) {
      case TbmChecklistCategory.Abnormal:
        this.setActiveChecklist(this.findNextChecklist(checklistName, this.abnormalChecklists));
        break;
      case TbmChecklistCategory.ChecklistIdentification:
        this.setActiveChecklist(this.findNextChecklist(checklistName, this.checklistIdentification));
        break;
      case TbmChecklistCategory.Emergency:
        this.setActiveChecklist(this.findNextChecklist(checklistName, this.emergencyChecklists));
        break;
      case TbmChecklistCategory.Normal:
        this.setActiveChecklist(this.findNextChecklist(checklistName, this.normalChecklists));
        break;
      // case TbmChecklistCategory.CrewAlerting:
      //   this.setActiveChecklist(this.findNextChecklist(checklistName, this.crewAlertingChecklists));
      //   break;
      // case TbmChecklistCategory.PerformanceData:
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
    checklist.items.forEach(x => x.state.set(TbmChecklistItemState.Incomplete));

    if (notify) {
      this.publisher.pub('Tbm_checklist_event', {
        type: 'checklist_reset',
        checklistName,
      }, true);
    }
  }

  /** Resets all checklists in the given category
   * @param category The category to reset.
   */
  public resetChecklistByCategory(category: TbmChecklistCategory): void {
    switch (category) {
      case TbmChecklistCategory.Abnormal:
        this.abnormalChecklists.forEach(x => this.resetChecklist(x.name));
        break;
      case TbmChecklistCategory.ChecklistIdentification:
        this.checklistIdentification.forEach(x => this.resetChecklist(x.name));
        break;
      case TbmChecklistCategory.Emergency:
        this.emergencyChecklists.forEach(x => this.resetChecklist(x.name));
        break;
      case TbmChecklistCategory.Normal:
        this.normalChecklists.forEach(x => this.resetChecklist(x.name));
        break;
      // case TbmChecklistCategory.CrewAlerting:
      //   this.crewAlertingChecklists.forEach(x => this.resetChecklist(x.name));
      //   break;
      // case TbmChecklistCategory.PerformanceData:
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
