import { ControllableDisplayPaneIndex } from "@microsoft/msfs-wtg3000-common/Components/DisplayPanes/DisplayPaneTypes";
import {
  ChecklistCategory,
  ChecklistItemState,
  ChecklistNames,
} from "@base/Shared/ChecklistSystem";

/** Active checklist changed Event. */
export interface ActiveChecklistChangedEvent<
  Names = ChecklistNames,
  Category = ChecklistCategory,
> {
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
export interface ChecklistResetEvent<
  Names = ChecklistNames,
  Category = ChecklistCategory,
> {
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
export interface ChecklistItemChangedEvent<
  Names = ChecklistNames,
  Category = ChecklistCategory,
> {
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
export interface CheckAllItemsEvent<
  Names = ChecklistNames,
  Category = ChecklistCategory,
> {
  /** The event type. */
  readonly type: "check_all_items";
  /** The name of the checklist. */
  readonly checklistName: Names;
  /** The category of the checklist. */
  readonly checklistCategory: Category;
}

/** Next checklist in category event. */
export interface NextChecklistInCategory<
  Names = ChecklistNames,
  Category = ChecklistCategory,
> {
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
export interface ChecklistEvents<
  Names = ChecklistNames,
  Category = ChecklistCategory,
> {
  /** Checklist event. */
  readonly checklist_event: ChecklistEvent<Names, Category>;
}
