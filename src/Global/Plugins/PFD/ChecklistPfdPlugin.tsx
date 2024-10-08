import { FSComponent, registerPlugin } from "@microsoft/msfs-sdk";
import { AbstractG3000PfdPlugin } from "@microsoft/msfs-wtg3000-pfd";
import { ChecklistFilePaths, ChecklistPane, ChecklistPaneKeys } from "@base/Shared";
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
import { DisplayPaneViewFactory } from "@microsoft/msfs-wtg3000-common";
import {
  HondaJetChecklistRepository,
  LongitudeChecklistRepository,
  TbmChecklistRepository,
  VisionJetChecklistRepository,
} from "../Shared/ChecklistSystem";
import { AircraftModel } from "../Shared/Common/AircraftModel";

const aircraftType = SimVar.GetSimVarValue("ATC MODEL", "string");
const isAircraftSupported = Object.values(AircraftModel).includes(aircraftType);

export class ChecklistPfdPlugin extends AbstractG3000PfdPlugin {
  registerDisplayPaneViews(viewFactory: DisplayPaneViewFactory) {
    if (!isAircraftSupported) {
      return;
    }

    if (aircraftType === AircraftModel.Longitude || aircraftType === AircraftModel.LongitudeMod) {
      viewFactory.registerView(ChecklistPaneKeys.Checklist, (index) => {
        return (
          <ChecklistPane
            halfSizeOnly={true}
            index={index}
            bus={this.binder.bus}
            repo={
              new LongitudeChecklistRepository(
                this.binder.bus,
                [...LongitudeAbbrevChecklists.getChecklists(), ...LongitudeNormalChecklists.getChecklists()],
                LongitudeAbbrevChecklists.getChecklists()[0],
              )
            }
          />
        );
      });
    } else if (aircraftType === AircraftModel.Tbm) {
      viewFactory.registerView(ChecklistPaneKeys.Checklist, (index) => {
        return (
          <ChecklistPane
            halfSizeOnly={true}
            index={index}
            bus={this.binder.bus}
            repo={
              new TbmChecklistRepository(
                this.binder.bus,
                [...TbmNormalChecklists.getChecklists(), ...TbmAmplifiedChecklists.getChecklists()],
                TbmNormalChecklists.getChecklists()[0],
              )
            }
          />
        );
      });
    } else if (aircraftType === AircraftModel.VisionJet) {
      viewFactory.registerView(ChecklistPaneKeys.Checklist, (index) => {
        return (
          <ChecklistPane
            halfSizeOnly={true}
            index={index}
            bus={this.binder.bus}
            repo={
              new VisionJetChecklistRepository(
                this.binder.bus,
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
      });
    } else if (aircraftType === AircraftModel.HondaJet) {
      viewFactory.registerView(ChecklistPaneKeys.Checklist, (index) => {
        return (
          <ChecklistPane
            halfSizeOnly={true}
            index={index}
            bus={this.binder.bus}
            repo={
              new HondaJetChecklistRepository(
                this.binder.bus,
                [...HondaJetNormalChecklists.getChecklists()],
                HondaJetNormalChecklists.getChecklists()[0],
              )
            }
          />
        );
      });
    }
  }
}

if (isAircraftSupported) {
  registerPlugin(ChecklistPfdPlugin);
}

export class ChecklistPfdCssPlugin extends AbstractG3000PfdPlugin {
  /** @inheritdoc */
  onInstalled() {
    this.loadCss(`${ChecklistFilePaths.PLUGINS_PATH}/ChecklistMfdPlugin.css`);
  }
}

if (isAircraftSupported) {
  registerPlugin(ChecklistPfdCssPlugin);
}
