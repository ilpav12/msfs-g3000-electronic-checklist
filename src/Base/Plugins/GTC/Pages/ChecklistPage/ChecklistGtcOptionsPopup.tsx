import { FSComponent, Subject, VNode } from "@microsoft/msfs-sdk";
import { GtcTouchButton, GtcView, GtcViewKeys, GtcViewProps } from "@microsoft/msfs-wtg3000-gtc";
import { ChecklistEvents, ChecklistReadonly } from "@base/Shared/ChecklistSystem";

import "./ChecklistGtcOptionsPopup.css";
import { ChecklistGtcViewKeys } from "@base/GTC/Pages/MfdHomePage/ChecklistGtcMfdHomePage";

interface ChecklistGtcOptionsPopupProps<Names, Category> extends GtcViewProps {
  /** The active checklist name. */
  activeChecklist: Subject<ChecklistReadonly<Names, Category>>;
}

/**
 * A popup for checklist options.
 */
export class ChecklistGtcOptionsPopup<Names, Category> extends GtcView<ChecklistGtcOptionsPopupProps<Names, Category>> {
  /** @inheritdoc */
  public onAfterRender(thisNode: VNode): void {
    super.onAfterRender(thisNode);

    this._title.set("Checklist");
  }

  /** @inheritDoc */
  public override render(): VNode {
    return (
      <div class="checklist-options-popup">
        <div class="checklist-options-popup-title">Checklist Options</div>
        <div class="checklist-options-popup-body">
          <GtcTouchButton
            label={"Check All"}
            class="checklist-options-popup-button"
            onPressed={() => {
              this.bus.getPublisher<ChecklistEvents<Names, Category>>().pub(
                "checklist_event",
                {
                  type: "check_all_items",
                  checklistName: this.props.activeChecklist.get().name,
                  checklistCategory: this.props.activeChecklist.get().category,
                },
                true,
              );
              this.gtcService.goBack();
            }}
          />
          <GtcTouchButton
            label={"Show Incomplete\nChecklists"}
            class="checklist-options-popup-button"
            onPressed={() => {
              this.gtcService.goBack();
              if (this.gtcService.activeView.get().key !== ChecklistGtcViewKeys.IncompleteChecklists) {
                this.gtcService.changePageTo(ChecklistGtcViewKeys.IncompleteChecklists);
              }
            }}
          />
          <GtcTouchButton
            label={"Reset Checklist"}
            class="checklist-options-popup-button"
            onPressed={() => {
              this.bus.getPublisher<ChecklistEvents<Names, Category>>().pub(
                "checklist_event",
                {
                  type: "checklist_reset",
                  checklistName: this.props.activeChecklist.get().name,
                  checklistCategory: this.props.activeChecklist.get().category,
                },
                true,
              );
              this.gtcService.goBack();
            }}
          />
          <GtcTouchButton
            label={"Reset All\nChecklists"}
            class="checklist-options-popup-button"
            onPressed={() => {
              this.bus.getPublisher<ChecklistEvents>().pub(
                "checklist_event",
                {
                  type: "all_checklists_reset",
                },
                true,
              );
              this.gtcService.goBack();
            }}
          />
        </div>
      </div>
    );
  }
}
