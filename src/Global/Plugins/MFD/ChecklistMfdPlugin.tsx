import { FSComponent, registerPlugin } from "@microsoft/msfs-sdk";
import { DisplayPaneViewFactory } from "@microsoft/msfs-wtg3000-common";
import { AbstractG3000MfdPlugin } from "@microsoft/msfs-wtg3000-mfd";
import { ChecklistFilePaths, ChecklistPane, ChecklistPaneKeys } from "@base/Shared";
import { LongitudeChecklistRepository, TbmChecklistRepository } from "../Shared/ChecklistSystem/ChecklistRepository";
import {
  LongitudeAbbrevChecklists,
  LongitudeNormalChecklists,
  TbmAmplifiedChecklists,
  TbmNormalChecklists,
} from "../Shared/ChecklistSystem/Checklists";
import { AircraftModel } from "../Shared/Common/AircraftModel";

const aircraftType = SimVar.GetSimVarValue("ATC MODEL", "string");
const isAircraftSupported = Object.values(AircraftModel).includes(aircraftType);

export class ChecklistMfdPlugin extends AbstractG3000MfdPlugin {
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
                TbmNormalChecklists.getChecklists()[1],
              )
            }
          />
        );
      });
    }
  }
}

if (isAircraftSupported) {
  registerPlugin(ChecklistMfdPlugin);
}

export class ChecklistMfdCssPlugin extends AbstractG3000MfdPlugin {
  /** @inheritdoc */
  onInstalled() {
    this.loadCss(`${ChecklistFilePaths.PLUGINS_PATH}/ChecklistMfdPlugin.css`);
  }
}

if (isAircraftSupported) {
  registerPlugin(ChecklistMfdCssPlugin);
}
