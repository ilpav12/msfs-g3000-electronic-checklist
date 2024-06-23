import {ChecklistRepository} from "@base/Shared/ChecklistSystem";
import {
  LongitudeChecklistCategory,
  LongitudeChecklistNames,
  TbmChecklistCategory,
  TbmChecklistNames
} from "./Checklist";

export class LongitudeChecklistRepository<Names = LongitudeChecklistNames, Category = LongitudeChecklistCategory> extends ChecklistRepository<Names, Category> {}

export class TbmChecklistRepository<Names = TbmChecklistNames, Category = TbmChecklistCategory> extends ChecklistRepository<Names, Category> {}

