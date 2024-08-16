import { FSComponent, registerPlugin } from "@microsoft/msfs-sdk";
import { AbstractG3000GtcPlugin, GtcService, GtcViewLifecyclePolicy } from "@microsoft/msfs-wtg3000-gtc";
import { ChecklistFilePaths } from "@base/Shared";
import { ChecklistGtcPage, BaseChecklistGtcPlugin, ChecklistGtcViewKeys } from "@base/GTC";
import {
  HondaJetChecklistCategory,
  LongitudeChecklistCategory,
  TbmChecklistCategory,
  VisionJetChecklistCategory,
} from "../Shared/ChecklistSystem/Checklist";
import {
  HondaJetNormalChecklists,
  LongitudeAbbrevChecklists,
  LongitudeNormalChecklists,
  TbmAmplifiedChecklists,
  TbmNormalChecklists,
  VisionJetAbnormalProceduresChecklists,
  VisionJetAdvisoryChecklists,
  VisionJetCautionAFChecklists,
  VisionJetCautionGZChecklists,
  VisionJetEmergencyProceduresChecklists,
  VisionJetNormalChecklists,
  VisionJetWarningChecklists,
} from "../Shared/ChecklistSystem/Checklists";
import {
  HondaJetChecklistRepository,
  LongitudeChecklistRepository,
  TbmChecklistRepository,
  VisionJetChecklistRepository,
} from "../Shared/ChecklistSystem/ChecklistRepository";
import { AircraftModel } from "../Shared/Common/AircraftModel";

const aircraftType = SimVar.GetSimVarValue("ATC MODEL", "string");
const isAircraftSupported = Object.values(AircraftModel).includes(aircraftType);

export class ChecklistGtcPlugin extends BaseChecklistGtcPlugin {
  /** @inheritdoc */
  public registerGtcViews(gtcService: GtcService) {
    if (!isAircraftSupported) {
      return;
    }

    gtcService.registerView(
      GtcViewLifecyclePolicy.Persistent,
      ChecklistGtcViewKeys.Checklist,
      "MFD",
      function (service, mode, index) {
        if (aircraftType === AircraftModel.Longitude || aircraftType === AircraftModel.LongitudeMod) {
          return (
            <ChecklistGtcPage
              gtcService={service}
              controlMode={mode}
              displayPaneIndex={index}
              checklistCategories={[LongitudeChecklistCategory.Abbrev, LongitudeChecklistCategory.Normal]}
              checklistRepository={
                new LongitudeChecklistRepository(
                  service.bus,
                  [...LongitudeAbbrevChecklists.getChecklists(), ...LongitudeNormalChecklists.getChecklists()],
                  LongitudeAbbrevChecklists.getChecklists()[0],
                )
              }
            />
          );
        } else if (aircraftType === AircraftModel.Tbm) {
          return (
            <ChecklistGtcPage
              gtcService={service}
              controlMode={mode}
              displayPaneIndex={index}
              checklistCategories={[TbmChecklistCategory.Normal, TbmChecklistCategory.Amplified]}
              checklistRepository={
                new TbmChecklistRepository(
                  service.bus,
                  [...TbmNormalChecklists.getChecklists(), ...TbmAmplifiedChecklists.getChecklists()],
                  TbmNormalChecklists.getChecklists()[1],
                )
              }
            />
          );
        } else if (aircraftType === AircraftModel.VisionJet) {
          return (
            <ChecklistGtcPage
              gtcService={service}
              controlMode={mode}
              displayPaneIndex={index}
              checklistCategories={[
                VisionJetChecklistCategory.EmergencyProcedures,
                VisionJetChecklistCategory.Warning,
                VisionJetChecklistCategory.AbnormalProcedures,
                VisionJetChecklistCategory.CautionAF,
                VisionJetChecklistCategory.CautionGZ,
                VisionJetChecklistCategory.Advisory,
                VisionJetChecklistCategory.Normal,
              ]}
              checklistRepository={
                new VisionJetChecklistRepository(
                  service.bus,
                  [
                    ...VisionJetEmergencyProceduresChecklists.getChecklists(),
                    ...VisionJetWarningChecklists.getChecklists(),
                    ...VisionJetAbnormalProceduresChecklists.getChecklists(),
                    ...VisionJetCautionGZChecklists.getChecklists(),
                    ...VisionJetCautionAFChecklists.getChecklists(),
                    ...VisionJetAdvisoryChecklists.getChecklists(),
                    ...VisionJetNormalChecklists.getChecklists(),
                  ],
                  VisionJetNormalChecklists.getChecklists()[6],
                )
              }
            />
          );
        } else if (aircraftType === AircraftModel.HondaJet) {
          return (
            <ChecklistGtcPage
              gtcService={service}
              controlMode={mode}
              displayPaneIndex={index}
              checklistCategories={[HondaJetChecklistCategory.Normal]}
              checklistRepository={
                new HondaJetChecklistRepository(
                  service.bus,
                  [...HondaJetNormalChecklists.getChecklists()],
                  HondaJetNormalChecklists.getChecklists()[0],
                )
              }
            />
          );
        }
      },
    );
  }
}

if (isAircraftSupported) {
  registerPlugin(ChecklistGtcPlugin);
}

export class ChecklistGtcCssPlugin extends AbstractG3000GtcPlugin {
  /** @inheritdoc */
  onInstalled() {
    this.loadCss(`${ChecklistFilePaths.PLUGINS_PATH}/ChecklistGtcPlugin.css`);
  }
}

if (isAircraftSupported) {
  registerPlugin(ChecklistGtcCssPlugin);
}
