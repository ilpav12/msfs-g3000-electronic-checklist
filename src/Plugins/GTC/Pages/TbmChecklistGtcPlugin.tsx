import {FSComponent, MappedSubject, registerPlugin} from "@microsoft/msfs-sdk";
import {
  AbstractG3000GtcPlugin, GtcInteractionEvent, GtcKnobStatePluginOverrides,
  GtcService, GtcViewKeys,
  GtcViewLifecyclePolicy, LabelBarPluginHandlers
} from "@microsoft/msfs-wtg3000-gtc";
import {TbmChecklistGtcMfdHomePage, TbmChecklistGtcPage} from "./index";
import {TbmChecklistGtcViewKeys} from "../GtcService/TbmChecklistGtcViewKeys";
import {TbmChecklistGtcInteractionEvent} from "../../Shared/Events/TbmChecklistGtcInteractionEvent";

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
        this.binder.bus.getPublisher<TbmChecklistGtcInteractionEvent>().pub('checklist_scroll_up', undefined, true);
        return true;
      case GtcInteractionEvent.MapKnobInc:
        this.binder.bus.getPublisher<TbmChecklistGtcInteractionEvent>().pub('checklist_scroll_down', undefined, true);
        return true;
      case GtcInteractionEvent.MapKnobPush:
        this.binder.bus.getPublisher<TbmChecklistGtcInteractionEvent>().pub('checklist_interact', undefined, true);
        return true;
      default:
        return false;
    }
  }
}

registerPlugin(TbmChecklistGtcPlugin);