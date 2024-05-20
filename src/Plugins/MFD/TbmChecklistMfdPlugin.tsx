import {AbstractG3000MfdPlugin} from "@microsoft/msfs-wtg3000-mfd";
import {FSComponent, registerPlugin} from "@microsoft/msfs-sdk";
import {DisplayPaneViewFactory} from "@microsoft/msfs-wtg3000-common";
import {TbmChecklistMfdPane} from "./Panes/TbmChecklistMfdPane";
import {TbmChecklistMfdPaneViewKeys} from "./Panes/TbmChecklistMfdPaneViewKeys";
import {TbmChecklistRepository} from "../Shared/ChecklistSystem";

export class TbmChecklistMfdPlugin extends AbstractG3000MfdPlugin {
  private readonly checklistRepository = new TbmChecklistRepository(this.binder.bus);

  registerDisplayPaneViews(viewFactory: DisplayPaneViewFactory) {
    viewFactory.registerView(TbmChecklistMfdPaneViewKeys.Checklist, (index) => {
      return (
        <TbmChecklistMfdPane
          halfSizeOnly={true}
          index={index}
          bus={this.binder.bus}
          repo={this.checklistRepository}
        />
      )
    })
  }
}

registerPlugin(TbmChecklistMfdPlugin);