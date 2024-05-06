import {AbstractG3000GtcPlugin} from "@microsoft/msfs-wtg3000-gtc";
import {TbmChecklistFilePaths} from "../Shared";
import {registerPlugin} from "@microsoft/msfs-sdk";

export class TbmChecklistCssPlugin extends AbstractG3000GtcPlugin {
  /** @inheritdoc */
  onInstalled() {
    this.loadCss(`${TbmChecklistFilePaths.PLUGINS_PATH}/TbmChecklistGtcPlugins.css`);
  }
}

registerPlugin(TbmChecklistCssPlugin);