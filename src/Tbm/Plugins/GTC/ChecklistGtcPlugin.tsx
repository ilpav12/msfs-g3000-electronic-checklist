import {registerPlugin} from "@microsoft/msfs-sdk";
import {AbstractG3000GtcPlugin} from "@microsoft/msfs-wtg3000-gtc";
import {ChecklistFilePaths} from "@base/Shared";
import {ChecklistGtcPlugin} from "@base/GTC";

registerPlugin(ChecklistGtcPlugin);

export class ChecklistGtcCssPlugin extends AbstractG3000GtcPlugin {
  /** @inheritdoc */
  onInstalled() {
    this.loadCss(`${ChecklistFilePaths.PLUGINS_PATH}/TbmChecklistGtcPlugins.css`);
  }
}

registerPlugin(ChecklistGtcCssPlugin);