import { ReadonlySubEvent, SubEvent, Subject, Subscribable, VNode } from '@microsoft/msfs-sdk';
import { ChecklistItemChangedEvent } from './TbmChecklistEvents';
import {
  TbmAbnormalChecklistNames, TbmChecklistIdentificationNames,
  TbmEmergencyChecklistNames, TbmNormalChecklistNames,
} from './Checklists';

/** The possible item types to focus on the softkey menu  */
export enum TbmChecklistPageFocusableItemType {
  CheckboxChecked,
  CheckboxUnchecked,
  Text,
  NextChecklist,
  SelectionList,
}

/** The possible Tbm checklist categories, in the order they appear in the aircraft */
export enum TbmChecklistCategory {
  Emergency = 'Emergency Procedures',
  Abnormal = 'Abnormal Procedures',
  Normal = 'Normal Procedures',
  ChecklistIdentification = 'Checklist Identification',
  // CrewAlerting = 'Crew Alerting System Annunciations',
  // PerformanceData = 'Performance Data',
}

/** The possible Tbm checklist names */
export type TbmChecklistNames =
  TbmAbnormalChecklistNames |
  TbmChecklistIdentificationNames |
  TbmEmergencyChecklistNames |
  TbmNormalChecklistNames;
  // TbmCrewAlertingChecklistNames |
  // TbmPerformanceDataChecklistNames;

/** The possible Tbm checklist item types */
export enum TbmChecklistItemType {
  Section = 'section',
  Checkbox = 'checkbox',
  Text = 'text',
}

/** The possible states of an Tbm checklist item */
export enum TbmChecklistItemState {
  Incomplete = 'Incomplete',
  Completed = 'Completed',
  NotApplicable = 'NotApplicable',
}

/** A checklist item that is readonly. */
export type TbmChecklistItemReadonly = TbmChecklistItem & {
  /** Readonly state. */
  readonly state: Subscribable<TbmChecklistItemState>;
}

/** Readonly checklist, with all items readonly. */
export type TbmChecklistReadonly = Pick<TbmChecklist, 'isComplete'| 'anyItemChanged' | 'name' | 'category' | 'isLastChecklist'> & {
  /** readonly items. */
  readonly items: readonly TbmChecklistItem[];
}

/** Tbm Checklist */
export class TbmChecklist {
  public readonly items: TbmChecklistItem[];

  private readonly _isComplete = Subject.create(false);
  public readonly isComplete = this._isComplete as Subscribable<boolean>;
  private readonly _anyItemChanged = new SubEvent<this, Omit<ChecklistItemChangedEvent, 'type' | 'mfdIndex'>>();
  public readonly anyItemChanged = this._anyItemChanged as ReadonlySubEvent<this, Omit<ChecklistItemChangedEvent, 'type' | 'mfdIndex'>>;

  /**
   * Creates a new instance of an Tbm Checklist
   * @param name The name of the checklist
   * @param category The category of the checklist
   * @param itemData The list of checklist items
   * @param isLastChecklist Whether this is the last checklist in the category
   */
  public constructor(
    public readonly name: TbmChecklistNames,
    public readonly category: TbmChecklistCategory,
    itemData: Array<TbmChecklistItemData>,
    public readonly isLastChecklist = false,
  ) {
    this.items = itemData.map(data => {
      return new TbmChecklistItem(
        data.type,
        data.type === TbmChecklistItemType.Checkbox || data.type === TbmChecklistItemType.Section ? data.title : undefined,
        data.type === TbmChecklistItemType.Checkbox ? data.action : undefined,
        data.type === TbmChecklistItemType.Text ? data.text : undefined,
        data.type === TbmChecklistItemType.Checkbox ? data.level : undefined,
        data.extendedMarginBelow
      );
    });

    this.items.forEach((v, i) => {
      v.state.sub(this.handleItemsStateChange(i));
    });
  }

  private readonly handleItemsStateChange = (itemIndex: number) => (itemState: TbmChecklistItemState): void => {
    const everyItemIsCompleted = this.items.every((v) => {
      return v.state.get() !== TbmChecklistItemState.Incomplete;
    });
    this._isComplete.set(everyItemIsCompleted);

    this._anyItemChanged.notify(this, {
      checklistName: this.name,
      itemIndex,
      itemState,
    });
  };

}

/** An Tbm checklist item */
export class TbmChecklistItem {
  public readonly state = Subject.create(this.type === TbmChecklistItemType.Checkbox ? TbmChecklistItemState.Incomplete : TbmChecklistItemState.NotApplicable);

  /**
   * Creates a new TbmChecklistItem
   * @param type The type of the checklist item
   * @param title The name of the checklist item (may be undefined)
   * @param action The task description (may be undefined or null)
   * @param textNode (optional) A VNode containing the text for text nodes
   * @param level The level of the checklist item (only required for checkboxes)
   * @param extendedMarginBelow Whether the margin below this item should be extended when rendered
   */
  public constructor(
    public readonly type: TbmChecklistItemType,
    public readonly title: string | undefined,
    public readonly action: string | undefined | null,
    public readonly textNode: (() => VNode) | undefined,
    public readonly level?: number,
    public readonly extendedMarginBelow?: boolean,
  ) {
    // check for validity of properties for the different types
    if (!title && (
        type === TbmChecklistItemType.Checkbox ||
        type === TbmChecklistItemType.Section
    )) {
      throw new Error('Title must be defined for Checkbox and Section type items');
    }
    if (!textNode && type === TbmChecklistItemType.Text) {
      throw new Error('Text VNode must be defined for Text type items');
    }
    // if there are other, non-relevant fields defined for the item, they will be ignored on render
  }
}

/** An interface describing an Tbm Checklist Checkbox Item */
export interface TbmChecklistCheckboxItemData {
  /** The type of checklist item */
  type: TbmChecklistItemType.Checkbox
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

/** An interface describing an Tbm Checklist Section Item */
export interface TbmChecklistSectionItemData {
  /** The type of checklist item */
  type: TbmChecklistItemType.Section
  /**
   * The title of the checklist item.
   */
  title: string;
}

/** An interface describing an Tbm Checklist Text Item */
export interface TbmChecklistTextItemData {
  /** The type of checklist item */
  type: TbmChecklistItemType.Text
  /** The text VNode of the checklist item (only required for Text items) */
  text: () => VNode;
}

/** An interface describing an Tbm Checklist Item */
export type TbmChecklistItemData = (TbmChecklistCheckboxItemData | TbmChecklistSectionItemData | TbmChecklistTextItemData) & {
  /** Whether or not to add an extended margin below the checklist item */
  extendedMarginBelow?: boolean;
}
