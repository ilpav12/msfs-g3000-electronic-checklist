import {ChecklistEvent} from "@base/Shared";
import {TbmChecklistCategory, TbmChecklistNames} from "./TbmChecklist";

/** Interface of the checklist events. */
export interface TbmChecklistEvents<T = TbmChecklistNames, U = TbmChecklistCategory> {
  /** Checklist event. */
  readonly checklist_event: ChecklistEvent<T, U>;
}