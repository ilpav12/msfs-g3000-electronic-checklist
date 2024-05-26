import { ReadonlySubEvent, SubEvent, Subject, Subscribable, VNode } from '@microsoft/msfs-sdk';
import { ChecklistItemChangedEvent } from '@base/Shared/ChecklistSystem/ChecklistEvents';
import {
  AbnormalChecklistNames, ChecklistIdentificationNames,
  EmergencyChecklistNames, NormalChecklistNames,
} from '@base/Shared/ChecklistSystem/Checklists';

/** The possible item types to focus on the softkey menu  */
export enum ChecklistPageFocusableItemType {
  CheckboxChecked,
  CheckboxUnchecked,
  Text,
  NextChecklist,
  SelectionList,
}

/** The possible  checklist categories, in the order they appear in the aircraft */
export enum ChecklistCategory {
  Emergency = 'Emergency Procedures',
  Abnormal = 'Abnormal Procedures',
  Normal = 'Normal Procedures',
  ChecklistIdentification = 'Checklist Identification',
  // CrewAlerting = 'Crew Alerting System Annunciations',
  // PerformanceData = 'Performance Data',
}

/** The possible checklist names */
export type ChecklistNames =
  AbnormalChecklistNames |
  ChecklistIdentificationNames |
  EmergencyChecklistNames |
  NormalChecklistNames;
// CrewAlertingChecklistNames |
// PerformanceDataChecklistNames;

/** The possible checklist item types */
export enum ChecklistItemType {
  Section = 'section',
  Checkbox = 'checkbox',
  Text = 'text',
}

/** The possible states of an checklist item */
export enum ChecklistItemState {
  Incomplete = 'Incomplete',
  Completed = 'Completed',
  NotApplicable = 'NotApplicable',
}

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
export class Checklist {
  public readonly items: ChecklistItem[];

  private readonly _isComplete = Subject.create(false);
  public readonly isComplete = this._isComplete as Subscribable<boolean>;
  private readonly _anyItemChanged = new SubEvent<this, Omit<ChecklistItemChangedEvent, 'type' | 'mfdIndex'>>();
  public readonly anyItemChanged = this._anyItemChanged as ReadonlySubEvent<this, Omit<ChecklistItemChangedEvent, 'type' | 'mfdIndex'>>;

  /**
   * Creates a new instance of an Checklist
   * @param name The name of the checklist
   * @param category The category of the checklist
   * @param itemData The list of checklist items
   * @param isLastChecklist Whether this is the last checklist in the category
   */
  public constructor(
    public readonly name: ChecklistNames,
    public readonly category: ChecklistCategory,
    itemData: Array<ChecklistItemData>,
    public readonly isLastChecklist = false,
  ) {
    this.items = itemData.map(data => {
      return new ChecklistItem(
        data.type,
        data.type === ChecklistItemType.Checkbox || data.type === ChecklistItemType.Section ? data.title : undefined,
        data.type === ChecklistItemType.Checkbox ? data.action : undefined,
        data.type === ChecklistItemType.Text ? data.text : undefined,
        data.type === ChecklistItemType.Checkbox ? data.level : undefined,
        data.extendedMarginBelow
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

/** An checklist item */
export class ChecklistItem {
  public readonly state = Subject.create(this.type === ChecklistItemType.Checkbox ? ChecklistItemState.Incomplete : ChecklistItemState.NotApplicable);

  /**
   * Creates a newChecklistItem
   * @param type The type of the checklist item
   * @param title The name of the checklist item (may be undefined)
   * @param action The task description (may be undefined or null)
   * @param textNode (optional) A VNode containing the text for text nodes
   * @param level The level of the checklist item (only required for checkboxes)
   * @param extendedMarginBelow Whether the margin below this item should be extended when rendered
   */
  public constructor(
    public readonly type: ChecklistItemType,
    public readonly title: string | undefined,
    public readonly action: string | undefined | null,
    public readonly textNode: (() => VNode) | undefined,
    public readonly level?: number,
    public readonly extendedMarginBelow?: boolean,
  ) {
    // check for validity of properties for the different types
    if (!title && (
        type === ChecklistItemType.Checkbox ||
        type === ChecklistItemType.Section
    )) {
      throw new Error('Title must be defined for Checkbox and Section type items');
    }
    if (!textNode && type === ChecklistItemType.Text) {
      throw new Error('Text VNode must be defined for Text type items');
    }
    // if there are other, non-relevant fields defined for the item, they will be ignored on render
  }
}

/** An interface describing an Checklist Checkbox Item */
export interface ChecklistCheckboxItemData {
  /** The type of checklist item */
  type: ChecklistItemType.Checkbox
  /**
   * The title of the checklist item.
   * Add \n to the place of the first line break to apply proper formatting.
   */
  title: string;
  /**
   * The action to perform when the checkbox is checked (optional)
   * Add \n to the place of the first line break to apply proper formatting.
   */
  action?: string | null;
  /** The level of the checklist item (optional, defaults to 1) */
  level?: number;
  /** Whether or not to add an extended margin below the checklist item */
  extendedMarginBelow?: boolean;
}

/** An interface describing an Checklist Section Item */
export interface ChecklistSectionItemData {
  /** The type of checklist item */
  type: ChecklistItemType.Section
  /**
   * The title of the checklist item.
   */
  title: string;
}

/** An interface describing an Checklist Text Item */
export interface ChecklistTextItemData {
  /** The type of checklist item */
  type: ChecklistItemType.Text
  /** The text VNode of the checklist item (only required for Text items) */
  text: () => VNode;
}

/** An interface describing an Checklist Item */
export type ChecklistItemData = (ChecklistCheckboxItemData | ChecklistSectionItemData | ChecklistTextItemData) & {
  /** Whether or not to add an extended margin below the checklist item */
  extendedMarginBelow?: boolean;
}
