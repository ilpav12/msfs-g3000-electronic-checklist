import { Checklist } from "@base/Shared/ChecklistSystem/Checklist";
import {
  LongitudeAbbrevProcChecklistNames,
  LongitudeNormalProcChecklistNames,
  TbmNormalProceduresChecklistNames,
  TbmAmplifiedProceduresChecklistNames,
  VisionJetEmergencyProceduresChecklistNames,
  VisionJetWarningChecklistNames,
  VisionJetAbnormalProceduresChecklistNames,
  VisionJetAdvisoryChecklistNames,
  VisionJetCautionAFChecklistNames,
  VisionJetCautionGZChecklistNames,
  VisionJetNormalChecklistNames,
  HondaJetNormalChecklistNames,
} from "./Checklists";

/** The possible Longitude checklist categories, in the order they appear in the aircraft */
export enum LongitudeChecklistCategory {
  AbbrevProc = "Abbrev Proc",
  NormalProc = "Normal Proc",
}

/** The possible Longitude checklist names */
export type LongitudeChecklistNames = LongitudeAbbrevProcChecklistNames | LongitudeNormalProcChecklistNames;

export class LongitudeChecklist<N = LongitudeChecklistNames, C = LongitudeChecklistCategory> extends Checklist<N, C> {}

/** The possible Tbm checklist categories, in the order they appear in the aircraft */
export enum TbmChecklistCategory {
  NormalProcedures = "Normal Procedures",
  AmplifiedProcedures = "Amplified Procedures",
}

/** The possible Tbm checklist names */
export type TbmChecklistNames = TbmNormalProceduresChecklistNames | TbmAmplifiedProceduresChecklistNames;

export class TbmChecklist<N = TbmChecklistNames, C = TbmChecklistCategory> extends Checklist<N, C> {}

/** The possible VisionJet checklist categories, in the order they appear in the aircraft */
export enum VisionJetChecklistCategory {
  EmergencyProcedures = "Emergency Procedures",
  Warning = "Warning",
  AbnormalProcedures = "Abnormal Procedures",
  CautionAF = "Caution (A-F)",
  CautionGZ = "Caution (G-Z)",
  Advisory = "Advisory",
  Normal = "Normal",
}

/** The possible VisionJet checklist names */
export type VisionJetChecklistNames =
  | VisionJetEmergencyProceduresChecklistNames
  | VisionJetWarningChecklistNames
  | VisionJetAbnormalProceduresChecklistNames
  | VisionJetCautionAFChecklistNames
  | VisionJetCautionGZChecklistNames
  | VisionJetAdvisoryChecklistNames
  | VisionJetNormalChecklistNames;

export class VisionJetChecklist<N = VisionJetChecklistNames, C = VisionJetChecklistCategory> extends Checklist<N, C> {}

/** The possible HondaJet checklist categories, in the order they appear in the aircraft */
export enum HondaJetChecklistCategory {
  Normal = "Normal",
}

/** The possible HondaJet checklist names */
export type HondaJetChecklistNames = HondaJetNormalChecklistNames;

export class HondaJetChecklist<N = HondaJetChecklistNames, C = HondaJetChecklistCategory> extends Checklist<N, C> {}
