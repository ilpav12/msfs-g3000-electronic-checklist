import {FSComponent, Subject, VNode} from "@microsoft/msfs-sdk";
import {GtcTouchButton, GtcView, GtcViewProps} from "@microsoft/msfs-wtg3000-gtc";
import {ChecklistEvents, ChecklistNames} from "@base/Shared/ChecklistSystem";

import "./ChecklistGtcOptionsPopup.css";

interface TbmChecklistGtcOptionsPopupProps extends GtcViewProps {
  /** The active checklist name. */
  activeChecklistName: Subject<ChecklistNames>,
}

/**
 * A popup for checklist options.
 */
export class ChecklistGtcOptionsPopup extends GtcView<TbmChecklistGtcOptionsPopupProps> {
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
            onPressed={() => {
              this.bus.getPublisher<ChecklistEvents>().pub('tbm_checklist_event', {
                type: 'check_all_items',
                checklistName: this.props.activeChecklistName.get(),
              }, true);
              this.gtcService.goBack();
            }}
          />
          <GtcTouchButton
            label={'Show Incomplete\nChecklists'}
            class='checklist-options-popup-button'
            onPressed={() => {
              // TODO
            }}
          />
          <GtcTouchButton
            label={'Reset Checklist'}
            class='checklist-options-popup-button'
            onPressed={() => {
              this.bus.getPublisher<ChecklistEvents>().pub('tbm_checklist_event', {
                type: 'checklist_reset',
                checklistName: this.props.activeChecklistName.get(),
              }, true);
              this.gtcService.goBack();
            }}
          />
          <GtcTouchButton
            label={'Reset All\nChecklists'}
            class='checklist-options-popup-button'
            onPressed={() => {
              this.bus.getPublisher<ChecklistEvents>().pub('tbm_checklist_event', {
                type: 'all_checklists_reset',
              }, true);
              this.gtcService.goBack();
            }}
          />
        </div>
      </div>
    );
  }
}