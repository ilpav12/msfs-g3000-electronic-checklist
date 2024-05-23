import {FSComponent, MappedSubject, registerPlugin} from "@microsoft/msfs-sdk";
import {
  AbstractG3000GtcPlugin,
  GtcInteractionEvent,
  GtcKnobStatePluginOverrides,
  GtcService,
  GtcViewKeys,
  GtcViewLifecyclePolicy,
  LabelBarPluginHandlers
} from "@microsoft/msfs-wtg3000-gtc";
import {TbmChecklistGtcMfdHomePage, TbmChecklistGtcPage} from "./index";
import {TbmChecklistGtcViewKeys} from "../GtcService/TbmChecklistGtcViewKeys";
import {
  ChecklistInteractionEventAction,
  TbmChecklistEvents
} from "../../Shared/ChecklistSystem/TbmChecklistEvents";

export class TbmChecklistGtcPlugin extends AbstractG3000GtcPlugin {
  /** @inheritdoc */
  public registerGtcViews(gtcService: GtcService) {
    gtcService.registerView(GtcViewLifecyclePolicy.Static, GtcViewKeys.MfdHome, 'MFD', function (service, mode, index) {
      return (
        <TbmChecklistGtcMfdHomePage
          gtcService={service}
          controlMode={mode}
          displayPaneIndex={index}
          supportPerfPage={false}
        />
      );
    });
    gtcService.registerView(GtcViewLifecyclePolicy.Persistent, TbmChecklistGtcViewKeys.Checklist, 'MFD', function (service, mode, index) {
      return (
        <TbmChecklistGtcPage
          gtcService={service}
          controlMode={mode}
          displayPaneIndex={index}
        />
      );
    });
  }

  private readonly isChecklistPaneViewActive = MappedSubject.create(
    ([selectedPaneIndex, viewKey]) => {
      return selectedPaneIndex !== -1 && viewKey === TbmChecklistGtcViewKeys.Checklist;
    },
    this.binder.gtcService.selectedDisplayPane,
    this.binder.gtcService.selectedPaneSettings.getSetting('displayPaneView')
  );

  /** @inheritdoc */
  public getKnobStateOverrides(gtcService: GtcService): Readonly<GtcKnobStatePluginOverrides> | null {
    return {
      mapKnobState: this.isChecklistPaneViewActive.map(isActive => isActive ? 'ChecklistKnobState' : null)
    };
  }

  /** @inheritdoc */
  public getLabelBarHandlers(): Readonly<LabelBarPluginHandlers> | null {
    return {
      mapKnobLabel: knobState => {
        return knobState === 'ChecklistKnobState' ? '↑Move↓\nPush:\nInteract' : null;
      }
    };
  }

  /** @inheritdoc */
  public onGtcInteractionEvent(event: GtcInteractionEvent): boolean {
    if (this.binder.gtcService.gtcKnobStates.mapKnobState.get() !== 'ChecklistKnobState') {
      return false;
    }

    switch (event) {
      case GtcInteractionEvent.MapKnobDec:
        this.binder.bus.getPublisher<TbmChecklistEvents>().pub('tbm_checklist_event', {
          type: 'checklist_interaction',
          action: ChecklistInteractionEventAction.ScrollUp,
        }, true);
        return true;
      case GtcInteractionEvent.MapKnobInc:
        this.binder.bus.getPublisher<TbmChecklistEvents>().pub('tbm_checklist_event', {
          type: 'checklist_interaction',
          action: ChecklistInteractionEventAction.ScrollDown,
        }, true);
        return true;
      case GtcInteractionEvent.MapKnobPush:
        this.binder.bus.getPublisher<TbmChecklistEvents>().pub('tbm_checklist_event', {
          type: 'checklist_interaction',
          action: ChecklistInteractionEventAction.Interact,
        }, true);
        return true;
      default:
        return false;
    }
  }
}

registerPlugin(TbmChecklistGtcPlugin);