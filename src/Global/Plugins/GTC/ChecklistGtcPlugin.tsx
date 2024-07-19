import { FSComponent, registerPlugin } from "@microsoft/msfs-sdk";
import { AbstractG3000GtcPlugin, GtcService, GtcViewKeys, GtcViewLifecyclePolicy } from "@microsoft/msfs-wtg3000-gtc";
import { ChecklistFilePaths } from "@base/Shared";
import { ChecklistGtcMfdHomePage, ChecklistGtcPage, BaseChecklistGtcPlugin, ChecklistGtcViewKeys } from "@base/GTC";
import { LongitudeChecklistCategory, TbmChecklistCategory } from "../Shared/ChecklistSystem/Checklist";
import {
  LongitudeAbbrevChecklists,
  LongitudeNormalChecklists,
  TbmAmplifiedChecklists,
  TbmNormalChecklists,
} from "../Shared/ChecklistSystem/Checklists";
import { LongitudeChecklistRepository, TbmChecklistRepository } from "../Shared/ChecklistSystem/ChecklistRepository";
import { AircraftModel } from "../Shared/Common/AircraftModel";

const aircraftType = SimVar.GetSimVarValue("ATC MODEL", "string");
const isAircraftSupported = Object.values(AircraftModel).includes(aircraftType);

export class ChecklistGtcPlugin extends BaseChecklistGtcPlugin {
  /** @inheritdoc */
  public registerGtcViews(gtcService: GtcService) {
    if (!isAircraftSupported) {
      return;
    }

    gtcService.registerView(GtcViewLifecyclePolicy.Static, GtcViewKeys.MfdHome, "MFD", function (service, mode, index) {
      return (
        <ChecklistGtcMfdHomePage
          gtcService={service}
          controlMode={mode}
          displayPaneIndex={index}
          supportPerfPage={aircraftType === AircraftModel.Longitude}
        />
      );
    });

    gtcService.registerView(
      GtcViewLifecyclePolicy.Persistent,
      ChecklistGtcViewKeys.Checklist,
      "MFD",
      function (service, mode, index) {
        if (aircraftType === AircraftModel.Longitude) {
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
