import {FSComponent, registerPlugin} from "@microsoft/msfs-sdk";
import {DisplayPaneViewFactory} from "@microsoft/msfs-wtg3000-common";
import {AbstractG3000MfdPlugin} from "@microsoft/msfs-wtg3000-mfd";
import {ChecklistPane, ChecklistPaneKeys} from "@base/Shared/Panes";
import {ChecklistRepository} from "@base/Shared/ChecklistSystem";
import {ChecklistFilePaths} from "@base/Shared";

export class ChecklistMfdPlugin extends AbstractG3000MfdPlugin {
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

registerPlugin(ChecklistMfdPlugin);

export class MfdChecklistCssPlugin extends AbstractG3000MfdPlugin {
  /** @inheritdoc */
  onInstalled() {
    this.loadCss(`${ChecklistFilePaths.PLUGINS_PATH}/ChecklistMfdPlugins.css`);
  }
}

registerPlugin(MfdChecklistCssPlugin);