import {AbstractG3000MfdPlugin} from "@microsoft/msfs-wtg3000-mfd";
import {FSComponent, registerPlugin} from "@microsoft/msfs-sdk";
import {DisplayPaneViewFactory} from "@microsoft/msfs-wtg3000-common";
import {TbmChecklistMfdPane} from "./Panes/TbmChecklistMfdPane";
import {TbmChecklistMfdPaneViewKeys} from "./Panes/TbmChecklistMfdPaneViewKeys";

export class TbmChecklistMfdPlugin extends AbstractG3000MfdPlugin {
  registerDisplayPaneViews(viewFactory: DisplayPaneViewFactory) {
    viewFactory.registerView(TbmChecklistMfdPaneViewKeys.Checklist, function (index) {
      return (
        <TbmChecklistMfdPane
          halfSizeOnly={true}
          index={index}
        />
      )
    })
  }
}

registerPlugin(TbmChecklistMfdPlugin);