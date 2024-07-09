import { MappedSubject } from "@microsoft/msfs-sdk";
import {
  AbstractG3000GtcPlugin,
  GtcInteractionEvent,
  GtcKnobStatePluginOverrides,
  LabelBarPluginHandlers,
} from "@microsoft/msfs-wtg3000-gtc";
import { ChecklistGtcViewKeys } from "@base/GTC/Pages";
import { ChecklistEvents, ChecklistInteractionEventAction } from "@base/Shared/ChecklistSystem/ChecklistEvents";

export class BaseChecklistGtcPlugin extends AbstractG3000GtcPlugin {
  private readonly isChecklistPaneViewActive = MappedSubject.create(
    ([selectedPaneIndex, viewKey]) => {
      return selectedPaneIndex !== -1 && viewKey === ChecklistGtcViewKeys.Checklist;
    },
    this.binder.gtcService.selectedDisplayPane,
    this.binder.gtcService.selectedPaneSettings.getSetting("displayPaneView"),
  );

  /** @inheritdoc */
  public getKnobStateOverrides(): Readonly<GtcKnobStatePluginOverrides> | null {
    return {
      mapKnobState: this.isChecklistPaneViewActive.map((isActive) => (isActive ? "ChecklistKnobState" : null)),
    };
  }

  /** @inheritdoc */
  public getLabelBarHandlers(): Readonly<LabelBarPluginHandlers> | null {
    return {
      mapKnobLabel: (knobState) => {
        if (knobState !== "ChecklistKnobState") {
          return null;
        }
        if (this.binder.gtcService.orientation === "vertical") {
          return "Select Item\nPush: Check";
        }
        return "Select\nItem\nPush:\nCheck";
      },
    };
  }

  /** @inheritdoc */
  public onGtcInteractionEvent(event: GtcInteractionEvent): boolean {
    if (this.binder.gtcService.gtcKnobStates.mapKnobState.get() !== "ChecklistKnobState") {
      return false;
    }

    if (this.binder.gtcService.selectedDisplayPane.get() === -1) {
      return false;
    }

    switch (event) {
      case GtcInteractionEvent.MapKnobDec:
        this.binder.bus.getPublisher<ChecklistEvents>().pub(
          "checklist_event",
          {
            type: "checklist_interaction",
            action: ChecklistInteractionEventAction.ScrollUp,
            targetPaneIndex: this.binder.gtcService.selectedDisplayPane.get(),
          },
          true,
        );
        return true;
      case GtcInteractionEvent.MapKnobInc:
        this.binder.bus.getPublisher<ChecklistEvents>().pub(
          "checklist_event",
          {
            type: "checklist_interaction",
            action: ChecklistInteractionEventAction.ScrollDown,
            targetPaneIndex: this.binder.gtcService.selectedDisplayPane.get(),
          },
          true,
        );
        return true;
      case GtcInteractionEvent.MapKnobPush:
        this.binder.bus.getPublisher<ChecklistEvents>().pub(
          "checklist_event",
          {
            type: "checklist_interaction",
            action: ChecklistInteractionEventAction.Interact,
            targetPaneIndex: this.binder.gtcService.selectedDisplayPane.get(),
          },
          true,
        );
        return true;
      default:
        return false;
    }
  }
}
