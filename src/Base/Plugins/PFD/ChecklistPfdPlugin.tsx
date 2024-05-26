import {FSComponent, registerPlugin} from "@microsoft/msfs-sdk";
import {DisplayPaneViewFactory} from "@microsoft/msfs-wtg3000-common";
import {AbstractG3000PfdPlugin} from "@microsoft/msfs-wtg3000-pfd";
import {ChecklistPane, ChecklistPaneKeys} from "@base/Shared/Panes";
import {ChecklistRepository} from "@base/Shared/ChecklistSystem";
import {ChecklistFilePaths} from "@base/Shared";

export class ChecklistPfdPlugin extends AbstractG3000PfdPlugin {
  private readonly checklistRepository = new ChecklistRepository(this.binder.bus);

  registerDisplayPaneViews(viewFactory: DisplayPaneViewFactory) {
    viewFactory.registerView(ChecklistPaneKeys.Checklist, (index) => {
      return (
        <ChecklistPane
          halfSizeOnly={true}
          index={index}
          bus={this.binder.bus}
          repo={this.checklistRepository}
        />
      )
    })
  }
}

registerPlugin(ChecklistPfdPlugin);

export class ChecklistPfdCssPlugin extends AbstractG3000PfdPlugin {
  /** @inheritdoc */
  onInstalled() {
    this.loadCss(`${ChecklistFilePaths.PLUGINS_PATH}/ChecklistMfdPlugins.css`);
  }
}

registerPlugin(ChecklistPfdCssPlugin);