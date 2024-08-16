import { FSComponent, Subject, Subscription, VNode } from "@microsoft/msfs-sdk";
import { GtcTouchButton, GtcView, GtcViewProps } from "@microsoft/msfs-wtg3000-gtc";
import { ChecklistEvents, ChecklistReadonly } from "@base/Shared/ChecklistSystem";
import { ChecklistGtcViewKeys } from "@base/GTC/ChecklistGtcViewKeys";

import "./ChecklistGtcOptionsPopup.css";

interface ChecklistGtcOptionsPopupProps<Names, Category> extends GtcViewProps {
  /** The active checklist name. */
  activeChecklist: Subject<ChecklistReadonly<Names, Category>>;
}

/**
 * A popup for checklist options.
 */
export class ChecklistGtcOptionsPopup<Names, Category> extends GtcView<ChecklistGtcOptionsPopupProps<Names, Category>> {
  private readonly parentViewKey = Subject.create<ChecklistGtcViewKeys>(ChecklistGtcViewKeys.Checklist);
  private activeViewSub?: Subscription;

  /** @inheritdoc */
  public onAfterRender(thisNode: VNode): void {
    super.onAfterRender(thisNode);

    this._title.set("Checklist");

    this.activeViewSub = this.gtcService.activeView.sub((view) => {
      if (view.key in ChecklistGtcViewKeys) {
        this.parentViewKey.set(this.gtcService.activeView.get().key as ChecklistGtcViewKeys);
      }
    });
  }

  /** @inheritdoc */
  public onResume(): void {
    this.activeViewSub?.resume(true);
  }

  /** @inheritdoc */
  public onPause(): void {
    this.activeViewSub?.pause();
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
            label={this.gtcService.isHorizontal ? "Show Incomplete\nChecklists" : "Show\nIncomplete\nChecklists"}
            class="checklist-options-popup-button"
            onPressed={() => {
              this.gtcService.goBack();
              this.gtcService.changePageTo(ChecklistGtcViewKeys.IncompleteChecklists);
            }}
            isEnabled={this.parentViewKey.map((v) => v !== ChecklistGtcViewKeys.IncompleteChecklists)}
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

  /** @inheritDoc */
  public destroy(): void {
    this.activeViewSub?.destroy();

    super.destroy();
  }
}
