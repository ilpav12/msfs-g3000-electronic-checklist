import {FSComponent, registerPlugin} from "@microsoft/msfs-sdk";
import {DisplayPaneViewFactory} from "@microsoft/msfs-wtg3000-common";
import {AbstractG3000MfdPlugin} from "@microsoft/msfs-wtg3000-mfd";
import {ChecklistFilePaths, ChecklistPane, ChecklistPaneKeys} from "@base/Shared";
import {LongitudeChecklistRepository} from "../Shared/ChecklistSystem/LongitudeChecklistRepository";
import {AbbrevChecklists, NormalChecklists} from "../Shared/ChecklistSystem/Checklists";

const normalChecklists = NormalChecklists.getChecklists();
const abbrevChecklists = AbbrevChecklists.getChecklists();

export class ChecklistMfdPlugin extends AbstractG3000MfdPlugin {
  private readonly checklists = [
    ...normalChecklists,
    ...abbrevChecklists,
  ];
  private readonly defaultChecklist = normalChecklists[0];
  private readonly checklistRepository = new LongitudeChecklistRepository(
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
    this.loadCss(`${ChecklistFilePaths.PLUGINS_PATH}/LongitudeChecklistMfdPlugins.css`);
  }
}

registerPlugin(ChecklistMfdCssPlugin);