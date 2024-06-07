import {Checklist} from "@base/Shared/ChecklistSystem/Checklist";
import {NormalChecklistNames} from "./Checklists";
import {ChecklistItem} from "@base/Shared";

/** The possible Tbm checklist categories, in the order they appear in the aircraft */
export enum TbmChecklistCategory {
  Normal = 'Normal Procedures',
}

/** The possible Tbm checklist names */
export type TbmChecklistNames =
  NormalChecklistNames

/** Readonly Tbm checklist, with all items readonly. */
export type TbmChecklistReadonly = Pick<TbmChecklist, 'isComplete'| 'anyItemChanged' | 'name' | 'category' | 'isLastChecklist'> & {
  /** readonly items. */
  readonly items: readonly ChecklistItem[];
}

export class TbmChecklist<T = TbmChecklistNames, U = TbmChecklistCategory> extends Checklist<T, U> {}
