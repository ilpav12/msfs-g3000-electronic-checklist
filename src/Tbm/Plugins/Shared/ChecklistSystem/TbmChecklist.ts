import {Checklist} from "@base/Shared/ChecklistSystem/Checklist";
import {NormalChecklistNames, AmplifiedChecklistNames} from "./Checklists";

/** The possible Tbm checklist categories, in the order they appear in the aircraft */
export enum TbmChecklistCategory {
  Normal = 'Normal Procedures',
  Amplified = 'Amplified Procedures',
}

/** The possible Tbm checklist names */
export type TbmChecklistNames =
  NormalChecklistNames |
  AmplifiedChecklistNames;

export class TbmChecklist<N = TbmChecklistNames, C = TbmChecklistCategory> extends Checklist<N, C> {}
