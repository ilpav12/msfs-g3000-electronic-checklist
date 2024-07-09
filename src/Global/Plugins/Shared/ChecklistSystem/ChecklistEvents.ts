import { ChecklistEvent } from "@base/Shared";
import {
  LongitudeChecklistCategory,
  LongitudeChecklistNames,
  TbmChecklistCategory,
  TbmChecklistNames,
} from "./Checklist";

/** Interface of the Longitude checklist events. */
export interface LongitudeChecklistEvents<T = LongitudeChecklistNames, U = LongitudeChecklistCategory> {
  /** Checklist event. */
  readonly checklist_event: ChecklistEvent<T, U>;
}

/** Interface of the Tbm checklist events. */
export interface TbmChecklistEvents<T = TbmChecklistNames, U = TbmChecklistCategory> {
  /** Checklist event. */
  readonly checklist_event: ChecklistEvent<T, U>;
}
