import {FSComponent, registerPlugin} from "@microsoft/msfs-sdk";
import {DisplayPaneViewFactory} from "@microsoft/msfs-wtg3000-common";
import {AbstractG3000MfdPlugin} from "@microsoft/msfs-wtg3000-mfd";
import {ChecklistPane, ChecklistPaneKeys} from "@base/Shared/Panes";
import {
  Checklist,
  ChecklistCategory,
  ChecklistNames,
  ChecklistReadonly,
  ChecklistRepository
} from "@base/Shared/ChecklistSystem";
import {ChecklistFilePaths} from "@base/Shared";
import {ItemsShowcaseChecklists} from "@base/Shared/ChecklistSystem/Checklists";

const itemsShowcaseChecklists = ItemsShowcaseChecklists.getChecklists();

export class ChecklistMfdPlugin extends AbstractG3000MfdPlugin {
  private readonly checklists: Checklist[] = [...itemsShowcaseChecklists];
  private readonly defaultChecklist: Checklist = itemsShowcaseChecklists[0];
  private readonly checklistRepository: ChecklistRepository = new ChecklistRepository(
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

registerPlugin(ChecklistMfdPlugin);

export class ChecklistMfdCssPlugin extends AbstractG3000MfdPlugin {
  /** @inheritdoc */
  onInstalled() {
    this.loadCss(`${ChecklistFilePaths.PLUGINS_PATH}/ChecklistMfdPlugins.css`);
  }
}

registerPlugin(ChecklistMfdCssPlugin);