import {FSComponent, registerPlugin} from "@microsoft/msfs-sdk";
import {AbstractG3000PfdPlugin} from "@microsoft/msfs-wtg3000-pfd";
import {ChecklistFilePaths, ChecklistPane, ChecklistPaneKeys} from "@base/Shared";
import {AmplifiedChecklists, NormalChecklists} from "../Shared/ChecklistSystem/Checklists";
import {DisplayPaneViewFactory} from "@microsoft/msfs-wtg3000-common";
import {TbmChecklistRepository} from "../Shared/ChecklistSystem";

const normalChecklist = NormalChecklists.getChecklists();
const amplifiedChecklist = AmplifiedChecklists.getChecklists();

export class ChecklistPfdPlugin extends AbstractG3000PfdPlugin {
  private readonly checklists = [
    ...amplifiedChecklist,
    ...normalChecklist,
  ];
  private readonly defaultChecklist = normalChecklist[1];
  private readonly checklistRepository = new TbmChecklistRepository(
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
    this.loadCss(`${ChecklistFilePaths.PLUGINS_PATH}/TbmChecklistMfdPlugins.css`);
  }
}

registerPlugin(ChecklistPfdCssPlugin);