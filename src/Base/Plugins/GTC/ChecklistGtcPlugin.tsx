import {
  DisplayComponent,
  DisplayComponentFactory,
  FSComponent,
  HEvent,
  MappedSubject,
  VNode,
} from "@microsoft/msfs-sdk";
import {
  AbstractG3000GtcPlugin,
  GtcDesignatedPaneButton,
  GtcInteractionEvent,
  GtcKnobStatePluginOverrides,
  ImgTouchButton,
  LabelBarPluginHandlers,
} from "@microsoft/msfs-wtg3000-gtc";
import { ChecklistGtcViewKeys } from "@base/GTC/ChecklistGtcViewKeys";
import {
  ChecklistEvents,
  ChecklistInteractionEventAction,
  ChecklistInteractEvents,
  ExternalChecklistEvent,
  ChecklistInteractLongEvents,
  ChecklistScrollUpEvents,
  ChecklistScrollDownEvents,
} from "@base/Shared/ChecklistSystem/ChecklistEvents";
import { DisplayPaneIndex, DisplayPanesUserSettings } from "@microsoft/msfs-wtg3000-common";
import { ControllableDisplayPaneIndex } from "@microsoft/msfs-wtg3000-common/Components/DisplayPanes/DisplayPaneTypes";
import { ChecklistFilePaths, ChecklistPaneKeys } from "@base/Shared";

class CreateFragmentFromComponentChildren extends DisplayComponent<any> {
  public render(): VNode {
    return <>{this.props.children}</>;
  }
}

export class BaseChecklistGtcPlugin extends AbstractG3000GtcPlugin {
  private isNavigraphPluginInstalled = (window as any)._pluginSystem.scripts.includes(
    "coui://html_ui/NavigraphMods/NavigraphG3000GtcPlugin.js",
  );
  private isChecklistButtonAlreadyPresent = false;

  /**
   * Adds the checklist GtcDesignatedPaneButton. If a checklist button is already present, it will replace it,
   * otherwise it will add it to the list of buttons. If Navigraph Plugin is installed, it will be placed in the fourth
   * row, otherwise it will be placed in the third row as in the real unit.
   */
  public onComponentCreating = (
    constructor: DisplayComponentFactory<any>,
    props: any,
  ): DisplayComponent<any> | undefined => {
    if (props.label === "Checklists") {
      this.isChecklistButtonAlreadyPresent = true;
      return new GtcDesignatedPaneButton({
        displayPaneSettingManager: this.binder.gtcService.selectedPaneSettings,
        selectedPaneViewKeys: [ChecklistPaneKeys.Checklist],
        label: "Checklist",
        imgSrc: ChecklistFilePaths.ASSETS_PATH + "/icon_small_checklist.png",
        onPressed: () => {
          this.binder.gtcService.selectedPaneSettings.getSetting("displayPaneDesignatedView").value =
            ChecklistPaneKeys.Checklist;
          this.binder.gtcService.selectedPaneSettings.getSetting("displayPaneView").value = ChecklistPaneKeys.Checklist;
          this.binder.gtcService.changePageTo(ChecklistGtcViewKeys.Checklist);
        },
        class: "gtc-directory-button",
      });
    }

    if (
      !this.isChecklistButtonAlreadyPresent &&
      constructor.name === "ImgTouchButton" &&
      ((this.isNavigraphPluginInstalled && props.label === "Waypoint<br>Info") ||
        (!this.isNavigraphPluginInstalled && props.label === "Music"))
    ) {
      props.children = [
        <GtcDesignatedPaneButton
          displayPaneSettingManager={this.binder.gtcService.selectedPaneSettings}
          selectedPaneViewKeys={[ChecklistPaneKeys.Checklist]}
          label="Checklist"
          imgSrc={ChecklistFilePaths.ASSETS_PATH + "/icon_small_checklist.png"}
          onPressed={() => {
            this.binder.gtcService.selectedPaneSettings.getSetting("displayPaneDesignatedView").value =
              ChecklistPaneKeys.Checklist;
            this.binder.gtcService.selectedPaneSettings.getSetting("displayPaneView").value =
              ChecklistPaneKeys.Checklist;
            this.binder.gtcService.changePageTo(ChecklistGtcViewKeys.Checklist);
          }}
          class="gtc-directory-button"
        />,
        new ImgTouchButton(props).render(),
      ];
      return new CreateFragmentFromComponentChildren(props);
    }

    return undefined;
  };

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
      case GtcInteractionEvent.MapKnobInc:
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
      case GtcInteractionEvent.MapKnobDec:
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

  /** @inheritdoc */
  public onInstalled() {
    super.onInstalled();

    if (this.binder.gtcService.instrumentIndex !== 1) {
      return;
    }

    const previousPanesState = {
      [DisplayPaneIndex.LeftPfd]: {
        previousView: DisplayPanesUserSettings.getDisplayPaneManager(
          this.binder.bus,
          DisplayPaneIndex.LeftPfd,
        ).getSetting("displayPaneView").value,
        wasVisible: DisplayPanesUserSettings.getDisplayPaneManager(
          this.binder.bus,
          DisplayPaneIndex.LeftPfd,
        ).getSetting("displayPaneVisible").value,
      },
      [DisplayPaneIndex.LeftMfd]: {
        previousView: DisplayPanesUserSettings.getDisplayPaneManager(
          this.binder.bus,
          DisplayPaneIndex.LeftMfd,
        ).getSetting("displayPaneView").value,
        wasVisible: DisplayPanesUserSettings.getDisplayPaneManager(
          this.binder.bus,
          DisplayPaneIndex.LeftMfd,
        ).getSetting("displayPaneVisible").value,
      },
      [DisplayPaneIndex.RightMfd]: {
        previousView: DisplayPanesUserSettings.getDisplayPaneManager(
          this.binder.bus,
          DisplayPaneIndex.RightMfd,
        ).getSetting("displayPaneView").value,
        wasVisible: DisplayPanesUserSettings.getDisplayPaneManager(
          this.binder.bus,
          DisplayPaneIndex.RightMfd,
        ).getSetting("displayPaneVisible").value,
      },
      [DisplayPaneIndex.RightPfd]: {
        previousView: DisplayPanesUserSettings.getDisplayPaneManager(
          this.binder.bus,
          DisplayPaneIndex.RightPfd,
        ).getSetting("displayPaneView").value,
        wasVisible: DisplayPanesUserSettings.getDisplayPaneManager(
          this.binder.bus,
          DisplayPaneIndex.RightPfd,
        ).getSetting("displayPaneVisible").value,
      },
    };

    // Open the checklist view on all panes to initialize all the subscriptions needed for synchronization and change
    // the view back to the previous one.
    for (const pane of [
      DisplayPaneIndex.LeftPfd,
      DisplayPaneIndex.LeftMfd,
      DisplayPaneIndex.RightMfd,
      DisplayPaneIndex.RightPfd,
    ]) {
      const paneView = DisplayPanesUserSettings.getDisplayPaneManager(this.binder.bus, pane).getSetting(
        "displayPaneView",
      );
      paneView.set(ChecklistGtcViewKeys.Checklist);
      paneView.set(previousPanesState[pane as ControllableDisplayPaneIndex].previousView);
    }

    this.binder.bus
      .getSubscriber<HEvent>()
      .on("hEvent")
      .handle((event) => {
        const pane = this.getExternalEventPane(event as ExternalChecklistEvent);
        const paneSettings = DisplayPanesUserSettings.getDisplayPaneManager(this.binder.bus, pane);

        if (Object.values(ChecklistInteractEvents).includes(event as ChecklistInteractEvents)) {
          const paneView = paneSettings.getSetting("displayPaneView");
          const paneVisibility = paneSettings.getSetting("displayPaneVisible");
          if (paneView.get() !== ChecklistGtcViewKeys.Checklist || !paneVisibility.get()) {
            previousPanesState[pane].wasVisible = paneVisibility.get();
            paneVisibility.set(true);

            previousPanesState[pane].previousView = paneView.get();
            paneView.set(ChecklistGtcViewKeys.Checklist);

            return true;
          }

          this.binder.bus.getPublisher<ChecklistEvents>().pub(
            "checklist_event",
            {
              type: "checklist_interaction",
              action: ChecklistInteractionEventAction.Interact,
              targetPaneIndex: pane,
            },
            true,
          );
          return true;
        }

        if (Object.values(ChecklistInteractLongEvents).includes(event as ChecklistInteractLongEvents)) {
          const paneView = paneSettings.getSetting("displayPaneView");
          const paneVisibility = paneSettings.getSetting("displayPaneVisible");
          if (paneView.get() !== ChecklistGtcViewKeys.Checklist || !paneVisibility.get()) {
            return false;
          }

          paneView.set(previousPanesState[pane].previousView);
          paneVisibility.set(previousPanesState[pane].wasVisible);

          return true;
        }

        if (Object.values(ChecklistScrollUpEvents).includes(event as ChecklistScrollUpEvents)) {
          if (
            DisplayPanesUserSettings.getDisplayPaneManager(this.binder.bus, pane).getSetting("displayPaneView")
              .value === ChecklistGtcViewKeys.Checklist
          ) {
            this.binder.bus.getPublisher<ChecklistEvents>().pub(
              "checklist_event",
              {
                type: "checklist_interaction",
                action: ChecklistInteractionEventAction.ScrollUp,
                targetPaneIndex: pane,
              },
              true,
            );
          }
          return true;
        }

        if (Object.values(ChecklistScrollDownEvents).includes(event as ChecklistScrollDownEvents)) {
          if (
            DisplayPanesUserSettings.getDisplayPaneManager(this.binder.bus, pane).getSetting("displayPaneView")
              .value === ChecklistGtcViewKeys.Checklist
          ) {
            this.binder.bus.getPublisher<ChecklistEvents>().pub(
              "checklist_event",
              {
                type: "checklist_interaction",
                action: ChecklistInteractionEventAction.ScrollDown,
                targetPaneIndex: pane,
              },
              true,
            );
          }
          return true;
        }

        return false;
      });
  }

  /**
   * Get the external event pane.
   * @param event An {@link ExternalChecklistEvent} event.
   * @returns The external event {@link ControllableDisplayPaneIndex}.
   */
  private getExternalEventPane(event: ExternalChecklistEvent): ControllableDisplayPaneIndex {
    const pane = event.split("_").find((s) => !isNaN(parseInt(s)));

    switch (pane) {
      case "1":
        return DisplayPaneIndex.LeftPfd;
      case "2":
        return DisplayPaneIndex.LeftMfd;
      case "3":
        return DisplayPaneIndex.RightMfd;
      case "4":
        return DisplayPaneIndex.RightPfd;
      default:
        return DisplayPaneIndex.LeftPfd;
    }
  }
}
