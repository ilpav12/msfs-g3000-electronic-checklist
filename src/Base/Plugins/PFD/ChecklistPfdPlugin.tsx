import {FSComponent, registerPlugin} from "@microsoft/msfs-sdk";
import {DisplayPaneViewFactory} from "@microsoft/msfs-wtg3000-common";
import {AbstractG3000PfdPlugin} from "@microsoft/msfs-wtg3000-pfd";
import {ChecklistPane, ChecklistPaneKeys} from "@base/Shared/Panes";
import {ChecklistRepository} from "@base/Shared/ChecklistSystem";
import {ChecklistFilePaths} from "@base/Shared";
import {ItemsShowcaseChecklists} from "@base/Shared/ChecklistSystem/Checklists";

const itemsShowcaseChecklists = ItemsShowcaseChecklists.getChecklists();

export class ChecklistPfdPlugin extends AbstractG3000PfdPlugin {
  private readonly checklists = [...itemsShowcaseChecklists];
  private readonly defaultChecklist = itemsShowcaseChecklists[0];
  private readonly checklistRepository = new ChecklistRepository(
    this.binder.bus,
    this.checklists,
    this.defaultChecklist
  );

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