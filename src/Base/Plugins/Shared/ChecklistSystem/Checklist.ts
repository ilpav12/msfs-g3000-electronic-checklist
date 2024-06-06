import { ReadonlySubEvent, SubEvent, Subject, Subscribable } from '@microsoft/msfs-sdk';
import { ChecklistItemChangedEvent } from '@base/Shared/ChecklistSystem/ChecklistEvents';
import {
  ChecklistItem,
  ChecklistItemData,
  ChecklistItemState,
  ChecklistItemType
} from "@base/Shared/ChecklistSystem/ChecklistItem";
import {ItemsShowcaseChecklistNames} from "@base/Shared/ChecklistSystem/Checklists";

/** The possible item types to focus on the softkey menu  */
export enum ChecklistPageFocusableItemType {
  ChallengeChecked,
  ChallengeUnchecked,
  Text,
  Link,
  NextChecklist,
}

/** The possible  checklist categories, in the order they appear in the aircraft */
export enum ChecklistCategory {
  ItemsShowcase = 'Items Showcase',
}

/** The possible checklist names */
export type ChecklistNames =
  ItemsShowcaseChecklistNames;

/** A checklist item that is readonly. */
export type ChecklistItemReadonly = ChecklistItem & {
  /** Readonly state. */
  readonly state: Subscribable<ChecklistItemState>;
}

/** Readonly checklist, with all items readonly. */
export type ChecklistReadonly = Pick<Checklist, 'isComplete'| 'anyItemChanged' | 'name' | 'category' | 'isLastChecklist'> & {
  /** readonly items. */
  readonly items: readonly ChecklistItem[];
}

/** Checklist */
export class Checklist<T = ChecklistNames, U = ChecklistCategory> {
  public readonly items: ChecklistItem[];

  private readonly _isComplete = Subject.create(false);
  public readonly isComplete = this._isComplete as Subscribable<boolean>;
  private readonly _anyItemChanged = new SubEvent<this, Omit<ChecklistItemChangedEvent<T>, 'type' | 'mfdIndex'>>();
  public readonly anyItemChanged = this._anyItemChanged as ReadonlySubEvent<this, Omit<ChecklistItemChangedEvent<T>, 'type' | 'mfdIndex'>>;

  /**
   * Creates a new instance of a Checklist
   * @param name The name of the checklist
   * @param category The category of the checklist
   * @param itemData The list of checklist items
   * @param isLastChecklist Whether this is the last checklist in the category
   * @param isSubChecklist Whether this is a sub-checklist
   */
  public constructor(
    public readonly name: T,
    public readonly category: U,
    itemData: Array<ChecklistItemData>,
    public readonly isLastChecklist = false,
    public readonly isSubChecklist = false,
  ) {
    this.items = itemData.map(data => {
      return new ChecklistItem(
        data.type,
        data.content,
        data.type === ChecklistItemType.Challenge ? data.response : undefined,
        data.type === ChecklistItemType.Link ? data.linkTarget : undefined,
        data.blanksBelow,
        "justification" in data ? data.justification : undefined,
        "image" in data ? data.image : undefined,
        data.interactionType,
        data.type === ChecklistItemType.Branch ? data.branchItems?.map(branchItemData => {
          return new ChecklistItem(
            branchItemData.type,
            branchItemData.content,
            undefined,
             branchItemData.linkTarget,
            undefined,
            undefined,
            undefined,
          )}) : undefined,
      );
    });

    this.items.forEach((v, i) => {
      v.state.sub(this.handleItemsStateChange(i));
    });
  }

  private readonly handleItemsStateChange = (itemIndex: number) => (itemState: ChecklistItemState): void => {
    const everyItemIsCompleted = this.items.every((v) => {
      return v.state.get() !== ChecklistItemState.Incomplete;
    });
    this._isComplete.set(everyItemIsCompleted);

    this._anyItemChanged.notify(this, {
      checklistName: this.name,
      itemIndex,
      itemState,
    });
  };

}
