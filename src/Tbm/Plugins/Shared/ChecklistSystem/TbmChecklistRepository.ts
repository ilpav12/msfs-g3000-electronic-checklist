import {ChecklistRepository} from "@base/Shared/ChecklistSystem";
import {TbmChecklistCategory, TbmChecklistNames} from "./TbmChecklist";

export class TbmChecklistRepository<Names = TbmChecklistNames, Category = TbmChecklistCategory> extends ChecklistRepository<Names, Category> {}
