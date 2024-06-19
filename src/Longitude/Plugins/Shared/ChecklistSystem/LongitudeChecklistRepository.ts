import {ChecklistRepository} from "@base/Shared/ChecklistSystem";
import {LongitudeChecklistCategory, LongitudeChecklistNames} from "./LongitudeChecklist";

export class LongitudeChecklistRepository<Names = LongitudeChecklistNames, Category = LongitudeChecklistCategory> extends ChecklistRepository<Names, Category> {}
