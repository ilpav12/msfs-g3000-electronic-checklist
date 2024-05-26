import {registerPlugin} from "@microsoft/msfs-sdk";
import {AbstractG3000PfdPlugin} from "@microsoft/msfs-wtg3000-pfd";
import {ChecklistFilePaths} from "@base/Shared";
import {ChecklistPfdPlugin} from "@base/PFD";

registerPlugin(ChecklistPfdPlugin);

export class ChecklistPfdCssPlugin extends AbstractG3000PfdPlugin {
  /** @inheritdoc */
  onInstalled() {
    this.loadCss(`${ChecklistFilePaths.PLUGINS_PATH}/TbmChecklistMfdPlugins.css`);
  }
}

registerPlugin(ChecklistPfdCssPlugin);