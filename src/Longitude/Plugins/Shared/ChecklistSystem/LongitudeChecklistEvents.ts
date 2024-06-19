import {ChecklistEvent} from "@base/Shared";
import {LongitudeChecklistCategory, LongitudeChecklistNames} from "./LongitudeChecklist";

/** Interface of the checklist events. */
export interface LongitudeChecklistEvents<T = LongitudeChecklistNames, U = LongitudeChecklistCategory> {
  /** Checklist event. */
  readonly checklist_event: ChecklistEvent<T, U>;
}