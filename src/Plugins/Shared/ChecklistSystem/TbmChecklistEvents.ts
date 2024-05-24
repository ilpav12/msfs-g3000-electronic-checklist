import { TbmChecklistCategory, TbmChecklistItemState, TbmChecklistNames } from './TbmChecklist';

/** Active checklist changed Event. */
export interface ActiveChecklistChangedEvent {
  /** The event type. */
  readonly type: 'active_checklist_changed';
  /** New active checklist. */
  readonly newActiveChecklistName: TbmChecklistNames;
}

/** Checklist reset event. */
export interface ChecklistResetEvent {
  /** The event type. */
  readonly type: 'checklist_reset';
  /** Name of the checklist that was reset. */
  readonly checklistName: TbmChecklistNames;
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
  readonly checklistName: TbmChecklistNames;
  /** The index of the checklist item. */
  readonly itemIndex: number;
  /** The state of the checklist item. */
  readonly itemState: TbmChecklistItemState;
}

export interface CheckAllItemsEvent {
  /** The event type. */
  readonly type: 'check_all_items';
  /** The name of the checklist. */
  readonly checklistName: TbmChecklistNames;
}

/** Next checklist in category event. */
export interface NextChecklistInCategory {
  /** The event type. */
  readonly type: 'next_checklist';
  /** The name of the current checklist. */
  readonly checklistName: TbmChecklistNames;
  /** The category of the current checklist. */
  readonly category: TbmChecklistCategory;
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
export interface TbmChecklistEvents {
  /** Tbm checklist event. */
  readonly tbm_checklist_event: TbmChecklistEvent;
}