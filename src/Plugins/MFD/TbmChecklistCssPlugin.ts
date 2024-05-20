import {AbstractG3000MfdPlugin} from "@microsoft/msfs-wtg3000-mfd";
import {TbmChecklistFilePaths} from "../Shared";
import {registerPlugin} from "@microsoft/msfs-sdk";

export class TbmChecklistCssPlugin extends AbstractG3000MfdPlugin {
  /** @inheritdoc */
  onInstalled() {
    this.loadCss(`${TbmChecklistFilePaths.PLUGINS_PATH}/TbmChecklistMfdPlugins.css`);
  }
}

registerPlugin(TbmChecklistCssPlugin);