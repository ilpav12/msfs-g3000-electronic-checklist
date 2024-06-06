import {ControllableDisplayPaneIndex} from "@microsoft/msfs-wtg3000-common/Components/DisplayPanes/DisplayPaneTypes";
import { ChecklistCategory, ChecklistItemState, ChecklistNames } from '@base/Shared/ChecklistSystem';

/** Active checklist changed Event. */
export interface ActiveChecklistChangedEvent<T = ChecklistNames> {
  /** The event type. */
  readonly type: 'active_checklist_changed';
  /** New active checklist. */
  readonly newActiveChecklistName: T;
  /** The index of the target pane. */
  readonly targetPaneIndex: ControllableDisplayPaneIndex | -1;
}

/** Checklist reset event. */
export interface ChecklistResetEvent<T = ChecklistNames> {
  /** The event type. */
  readonly type: 'checklist_reset';
  /** Name of the checklist that was reset. */
  readonly checklistName: T;
}

export interface AllChecklistsResetEvent {
  /** The event type. */
  readonly type: 'all_checklists_reset';
}

/** Checklist item changed event. */
export interface ChecklistItemChangedEvent<T = ChecklistNames> {
  /** The event type. */
  readonly type: 'item_changed';
  /** The name of the checklist containing the changed item. */
  readonly checklistName: T;
  /** The index of the checklist item. */
  readonly itemIndex: number;
  /** The state of the checklist item. */
  readonly itemState: ChecklistItemState;
}

/** Check all items event. */
export interface CheckAllItemsEvent<T = ChecklistNames> {
  /** The event type. */
  readonly type: 'check_all_items';
  /** The name of the checklist. */
  readonly checklistName: T;
}

/** Next checklist in category event. */
export interface NextChecklistInCategory<T = ChecklistNames, U = ChecklistCategory> {
  /** The event type. */
  readonly type: 'next_checklist';
  /** The name of the current checklist. */
  readonly checklistName: T;
  /** The category of the current checklist. */
  readonly category: U;
  /** The index of the target pane. */
  readonly targetPaneIndex: ControllableDisplayPaneIndex | -1;
}

/** Checklist interaction event. */
export interface ChecklistInteractionEvent {
  /** The event type. */
  readonly type: 'checklist_interaction';
  /** The event action. */
  readonly action: ChecklistInteractionEventAction;
  /** The index of the target pane. */
  readonly targetPaneIndex: ControllableDisplayPaneIndex | -1;
}

/** Checklist interaction event action. */
export enum ChecklistInteractionEventAction {
  ScrollUp = 'checklist_scroll_up',
  ScrollDown = 'checklist_scroll_down',
  Interact = 'checklist_interact',
}

/** Checklist event. */
export type ChecklistEvent<T, U> =
  ActiveChecklistChangedEvent<T>
  | ChecklistResetEvent<T>
  | AllChecklistsResetEvent
  | ChecklistItemChangedEvent<T>
  | CheckAllItemsEvent<T>
  | NextChecklistInCategory<T, U>
  | ChecklistInteractionEvent;

/** Interface of the checklist events. */
export interface ChecklistEvents<T = ChecklistNames, U = ChecklistCategory> {
  /** Checklist event. */
  readonly checklist_event: ChecklistEvent<T, U>;
}