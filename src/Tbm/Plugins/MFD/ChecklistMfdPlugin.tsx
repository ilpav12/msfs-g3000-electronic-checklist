import {registerPlugin} from "@microsoft/msfs-sdk";
import {AbstractG3000MfdPlugin} from "@microsoft/msfs-wtg3000-mfd";
import {ChecklistFilePaths} from "@base/Shared";
import {ChecklistMfdPlugin} from "@base/MFD";

registerPlugin(ChecklistMfdPlugin);

export class ChecklistMfdCssPlugin extends AbstractG3000MfdPlugin {
  /** @inheritdoc */
  onInstalled() {
    this.loadCss(`${ChecklistFilePaths.PLUGINS_PATH}/TbmChecklistMfdPlugins.css`);
  }
}

registerPlugin(ChecklistMfdCssPlugin);