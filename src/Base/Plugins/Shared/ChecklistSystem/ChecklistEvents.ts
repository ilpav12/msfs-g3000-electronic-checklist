import { ChecklistCategory, ChecklistItemState, ChecklistNames } from '@base/Shared/ChecklistSystem/Checklist';

/** Active checklist changed Event. */
export interface ActiveChecklistChangedEvent {
  /** The event type. */
  readonly type: 'active_checklist_changed';
  /** New active checklist. */
  readonly newActiveChecklistName: ChecklistNames;
}

/** Checklist reset event. */
export interface ChecklistResetEvent {
  /** The event type. */
  readonly type: 'checklist_reset';
  /** Name of the checklist that was reset. */
  readonly checklistName: ChecklistNames;
}

export interface AllChecklistsResetEvent {
  /** The event type. */
  readonly type: 'all_checklists_reset';
}

/** Checklist item changed event. */
export interface ChecklistItemChangedEvent {
  /** The event type. */
  readonly type: 'item_changed';
  /** The name of the checklist containing the changed item. */
  readonly checklistName: ChecklistNames;
  /** The index of the checklist item. */
  readonly itemIndex: number;
  /** The state of the checklist item. */
  readonly itemState: ChecklistItemState;
}

export interface CheckAllItemsEvent {
  /** The event type. */
  readonly type: 'check_all_items';
  /** The name of the checklist. */
  readonly checklistName: ChecklistNames;
}

/** Next checklist in category event. */
export interface NextChecklistInCategory {
  /** The event type. */
  readonly type: 'next_checklist';
  /** The name of the current checklist. */
  readonly checklistName: ChecklistNames;
  /** The category of the current checklist. */
  readonly category: ChecklistCategory;
}

export interface ChecklistInteractionEvent {
  /** The event type. */
  readonly type: 'checklist_interaction';
  /** The event action. */
  readonly action: ChecklistInteractionEventAction;
}

export enum ChecklistInteractionEventAction {
  ScrollUp = 'checklist_scroll_up',
  ScrollDown = 'checklist_scroll_down',
  Interact = 'checklist_interact',
}

/** Tbm checklist event. */
export type TbmChecklistEvent =
  ActiveChecklistChangedEvent
  | ChecklistResetEvent
  | AllChecklistsResetEvent
  | ChecklistItemChangedEvent
  | CheckAllItemsEvent
  | NextChecklistInCategory
  | ChecklistInteractionEvent;

/** Interface of the Tbm checklist events. */
export interface ChecklistEvents {
  /** Tbm checklist event. */
  readonly tbm_checklist_event: TbmChecklistEvent;
}