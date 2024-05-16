import {DisplayPaneView} from "@microsoft/msfs-wtg3000-common";
import {FSComponent, VNode} from "@microsoft/msfs-sdk";

export class TbmChecklistMfdPane extends DisplayPaneView {

  /** @inheritDoc */
  onAfterRender(node: VNode) {
    super.onAfterRender(node);

    this._title.set('Checklist');
  }


  /** @inheritDoc */
  render(): VNode {
    return (<div>Checklist</div>);
  }
}