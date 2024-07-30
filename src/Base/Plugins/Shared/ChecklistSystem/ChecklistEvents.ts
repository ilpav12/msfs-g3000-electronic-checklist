import { ControllableDisplayPaneIndex } from "@microsoft/msfs-wtg3000-common/Components/DisplayPanes/DisplayPaneTypes";
import { ChecklistCategory, ChecklistItemState, ChecklistNames } from "@base/Shared/ChecklistSystem";

/** Active checklist changed Event. */
export interface ActiveChecklistChangedEvent<Names = ChecklistNames, Category = ChecklistCategory> {
  /** The event type. */
  readonly type: "active_checklist_changed";
  /** New active checklist name. */
  readonly newActiveChecklistName: Names;
  /** New active checklist category. */
  readonly newActiveChecklistCategory: Category;
  /** The index of the target pane. */
  readonly targetPaneIndex: ControllableDisplayPaneIndex;
}

/** Checklist reset event. */
export interface ChecklistResetEvent<Names = ChecklistNames, Category = ChecklistCategory> {
  /** The event type. */
  readonly type: "checklist_reset";
  /** The name of the checklist that was reset. */
  readonly checklistName: Names;
  /** The category of the checklist that was reset. */
  readonly checklistCategory: Category;
}

export interface AllChecklistsResetEvent {
  /** The event type. */
  readonly type: "all_checklists_reset";
}

/** Checklist item changed event. */
export interface ChecklistItemChangedEvent<Names = ChecklistNames, Category = ChecklistCategory> {
  /** The event type. */
  readonly type: "item_changed";
  /** The name of the checklist containing the changed item. */
  readonly checklistName: Names;
  /** The category of the checklist containing the changed item. */
  readonly checklistCategory: Category;
  /** The index of the checklist item. */
  readonly itemIndex: number;
  /** The state of the checklist item. */
  readonly itemState: ChecklistItemState;
}

/** Check all items event. */
export interface CheckAllItemsEvent<Names = ChecklistNames, Category = ChecklistCategory> {
  /** The event type. */
  readonly type: "check_all_items";
  /** The name of the checklist. */
  readonly checklistName: Names;
  /** The category of the checklist. */
  readonly checklistCategory: Category;
}

/** Next checklist in category event. */
export interface NextChecklistInCategory<Names = ChecklistNames, Category = ChecklistCategory> {
  /** The event type. */
  readonly type: "next_checklist";
  /** The name of the current checklist. */
  readonly checklistName: Names;
  /** The category of the current checklist. */
  readonly checklistCategory: Category;
  /** The index of the target pane. */
  readonly targetPaneIndex: ControllableDisplayPaneIndex;
}

/** Checklist interaction event. */
export interface ChecklistInteractionEvent {
  /** The event type. */
  readonly type: "checklist_interaction";
  /** The event action. */
  readonly action: ChecklistInteractionEventAction;
  /** The index of the target pane. */
  readonly targetPaneIndex: ControllableDisplayPaneIndex | -1;
}

/** Checklist interaction event action. */
export enum ChecklistInteractionEventAction {
  ScrollUp = "checklist_scroll_up",
  ScrollDown = "checklist_scroll_down",
  Interact = "checklist_interact",
}

/** Checklist event. */
export type ChecklistEvent<Names, Category> =
  | ActiveChecklistChangedEvent<Names, Category>
  | ChecklistResetEvent<Names, Category>
  | AllChecklistsResetEvent
  | ChecklistItemChangedEvent<Names, Category>
  | CheckAllItemsEvent<Names, Category>
  | NextChecklistInCategory<Names, Category>
  | ChecklistInteractionEvent;

/** Interface of the checklist events. */
export interface ChecklistEvents<Names = ChecklistNames, Category = ChecklistCategory> {
  /** Checklist event. */
  readonly checklist_event: ChecklistEvent<Names, Category>;
}

/** Checklist scroll up events. */
export enum ChecklistScrollUpEvents {
  ChecklistPane1ScrollUp = "AS3000_Electronic_Checklist_1_Scroll_Up",
  ChecklistPane2ScrollUp = "AS3000_Electronic_Checklist_2_Scroll_Up",
  ChecklistPane3ScrollUp = "AS3000_Electronic_Checklist_3_Scroll_Up",
  ChecklistPane4ScrollUp = "AS3000_Electronic_Checklist_4_Scroll_Up",
}

/** Checklist scroll down events. */
export enum ChecklistScrollDownEvents {
  ChecklistPane1ScrollDown = "AS3000_Electronic_Checklist_1_Scroll_Down",
  ChecklistPane2ScrollDown = "AS3000_Electronic_Checklist_2_Scroll_Down",
  ChecklistPane3ScrollDown = "AS3000_Electronic_Checklist_3_Scroll_Down",
  ChecklistPane4ScrollDown = "AS3000_Electronic_Checklist_4_Scroll_Down",
}

/** Checklist interact events. */
export enum ChecklistInteractEvents {
  ChecklistPane1Interact = "AS3000_Electronic_Checklist_1_Push",
  ChecklistPane2Interact = "AS3000_Electronic_Checklist_2_Push",
  ChecklistPane3Interact = "AS3000_Electronic_Checklist_3_Push",
  ChecklistPane4Interact = "AS3000_Electronic_Checklist_4_Push",
}

/** Checklist interact events. */
export enum ChecklistInteractLongEvents {
  ChecklistPane1InteractLong = "AS3000_Electronic_Checklist_1_Push_Long",
  ChecklistPane2InteractLong = "AS3000_Electronic_Checklist_2_Push_Long",
  ChecklistPane3InteractLong = "AS3000_Electronic_Checklist_3_Push_Long",
  ChecklistPane4InteractLong = "AS3000_Electronic_Checklist_4_Push_Long",
}

/** External checklist events. */
export type ExternalChecklistEvent =
  | ChecklistScrollUpEvents
  | ChecklistScrollDownEvents
  | ChecklistInteractEvents
  | ChecklistInteractLongEvents;

/** Interface of the external checklist events. */
export interface ExternalChecklistEvents {
  /** External checklist event. */
  external_checklist_event: ExternalChecklistEvent;
}
