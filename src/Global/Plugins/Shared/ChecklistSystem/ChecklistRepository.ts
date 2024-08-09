import { ChecklistRepository } from "@base/Shared/ChecklistSystem";
import {
  LongitudeChecklistCategory,
  LongitudeChecklistNames,
  TbmChecklistCategory,
  TbmChecklistNames,
  VisionJetChecklistCategory,
  VisionJetChecklistNames,
} from "./Checklist";

export class LongitudeChecklistRepository<
  Names = LongitudeChecklistNames,
  Category = LongitudeChecklistCategory,
> extends ChecklistRepository<Names, Category> {}

export class TbmChecklistRepository<
  Names = TbmChecklistNames,
  Category = TbmChecklistCategory,
> extends ChecklistRepository<Names, Category> {}

export class VisionJetChecklistRepository<
  Names = VisionJetChecklistNames,
  Category = VisionJetChecklistCategory,
> extends ChecklistRepository<Names, Category> {}
