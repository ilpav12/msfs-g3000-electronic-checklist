import {FSComponent, VNode} from "@microsoft/msfs-sdk";
import {GtcTouchButton, GtcView} from "@microsoft/msfs-wtg3000-gtc";

import "./TbmChecklistGtcOptionsPopup.css";

export class TbmChecklistGtcOptionsPopup extends GtcView {
  /** @inheritdoc */
  public onAfterRender(thisNode: VNode): void {
    super.onAfterRender(thisNode);

    this._title.set('Checklist');
  }

  /** @inheritDoc */
  public override render(): VNode {
    return (
      <div class='checklist-options-popup'>
        <div class='checklist-options-popup-title'>Checklist Options</div>
        <div class='checklist-options-popup-body'>
          <GtcTouchButton
            label={'Check All'}
            class='checklist-options-popup-button'
          />
          <GtcTouchButton
            label={'Show Incomplete\nChecklists'}
            class='checklist-options-popup-button'
          />
          <GtcTouchButton
            label={'Reset Checklist'}
            class='checklist-options-popup-button'
          />
          <GtcTouchButton
            label={'Reset All\nChecklists'}
            class='checklist-options-popup-button'
          />
        </div>
      </div>
    );
  }
}