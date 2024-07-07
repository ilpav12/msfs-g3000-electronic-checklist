import { Checklist } from "@base/Shared/ChecklistSystem/Checklist";
import {
  LongitudeAbbrevChecklistNames,
  LongitudeNormalChecklistNames,
  TbmNormalChecklistNames,
  TbmAmplifiedChecklistNames,
} from "./Checklists";

/** The possible Tbm checklist categories, in the order they appear in the aircraft */
export enum LongitudeChecklistCategory {
  Normal = "Normal Proc",
  Abbrev = "Abbreviated Proc",
}

/** The possible Tbm checklist names */
export type LongitudeChecklistNames =
  | LongitudeNormalChecklistNames
  | LongitudeAbbrevChecklistNames;

export class LongitudeChecklist<
  N = LongitudeChecklistNames,
  C = LongitudeChecklistCategory,
> extends Checklist<N, C> {}

/** The possible Tbm checklist categories, in the order they appear in the aircraft */
export enum TbmChecklistCategory {
  Normal = "Normal Procedures",
  Amplified = "Amplified Procedures",
}

/** The possible Tbm checklist names */
export type TbmChecklistNames =
  | TbmNormalChecklistNames
  | TbmAmplifiedChecklistNames;

export class TbmChecklist<
  N = TbmChecklistNames,
  C = TbmChecklistCategory,
> extends Checklist<N, C> {}
