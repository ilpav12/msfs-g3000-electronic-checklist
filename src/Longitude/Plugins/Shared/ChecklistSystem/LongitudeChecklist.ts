import {Checklist} from "@base/Shared/ChecklistSystem/Checklist";
import {AbbrevChecklistNames, NormalChecklistNames} from "./Checklists";

/** The possible Tbm checklist categories, in the order they appear in the aircraft */
export enum LongitudeChecklistCategory {
  Normal = 'Normal Proc',
  Abbrev = 'Abbreviated Proc',
}

/** The possible Tbm checklist names */
export type LongitudeChecklistNames =
  NormalChecklistNames |
  AbbrevChecklistNames;

export class LongitudeChecklist<N = LongitudeChecklistNames, C = LongitudeChecklistCategory> extends Checklist<N, C> {}
