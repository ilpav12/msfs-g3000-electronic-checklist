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
import {ChecklistGtcMfdHomePage, ChecklistGtcPage, ChecklistGtcViewKeys} from "@base/GTC/Pages";
import {
  ChecklistInteractionEventAction,
  ChecklistEvents
} from "@base/Shared/ChecklistSystem/ChecklistEvents";
import {ChecklistFilePaths} from "@base/Shared";

export class ChecklistGtcPlugin extends AbstractG3000GtcPlugin {
  /** @inheritdoc */
  public registerGtcViews(gtcService: GtcService) {
    gtcService.registerView(GtcViewLifecyclePolicy.Static, GtcViewKeys.MfdHome, 'MFD', function (service, mode, index) {
      return (
        <ChecklistGtcMfdHomePage
          gtcService={service}
          controlMode={mode}
          displayPaneIndex={index}
          supportPerfPage={false}
        />
      );
    });
    gtcService.registerView(GtcViewLifecyclePolicy.Persistent, ChecklistGtcViewKeys.Checklist, 'MFD', function (service, mode, index) {
      return (
        <ChecklistGtcPage
          gtcService={service}
          controlMode={mode}
          displayPaneIndex={index}
        />
      );
    });
  }

  private readonly isChecklistPaneViewActive = MappedSubject.create(
    ([selectedPaneIndex, viewKey]) => {
      return selectedPaneIndex !== -1 && viewKey === ChecklistGtcViewKeys.Checklist;
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
        if (knobState !== 'ChecklistKnobState') {
          return null;
        }
        if (this.binder.gtcService.orientation === 'vertical') {
          return 'Select Item\nPush: Check';
        }
        return 'Select\nItem\nPush:\nCheck';
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
        this.binder.bus.getPublisher<ChecklistEvents>().pub('tbm_checklist_event', {
          type: 'checklist_interaction',
          action: ChecklistInteractionEventAction.ScrollUp,
        }, true);
        return true;
      case GtcInteractionEvent.MapKnobInc:
        this.binder.bus.getPublisher<ChecklistEvents>().pub('tbm_checklist_event', {
          type: 'checklist_interaction',
          action: ChecklistInteractionEventAction.ScrollDown,
        }, true);
        return true;
      case GtcInteractionEvent.MapKnobPush:
        this.binder.bus.getPublisher<ChecklistEvents>().pub('tbm_checklist_event', {
          type: 'checklist_interaction',
          action: ChecklistInteractionEventAction.Interact,
        }, true);
        return true;
      default:
        return false;
    }
  }
}

registerPlugin(ChecklistGtcPlugin);

export class ChecklistGtcCssPlugin extends AbstractG3000GtcPlugin {
  /** @inheritdoc */
  onInstalled() {
    this.loadCss(`${ChecklistFilePaths.PLUGINS_PATH}/ChecklistGtcPlugins.css`);
  }
}

registerPlugin(ChecklistGtcCssPlugin);