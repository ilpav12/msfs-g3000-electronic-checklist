import {FSComponent, Subject, VNode} from "@microsoft/msfs-sdk";
import {
  GtcControlMode,
  GtcList,
  GtcListItem,
  GtcService,
  GtcTouchButton,
  GtcView,
  GtcViewLifecyclePolicy,
  TabbedContainer,
  TabbedContent,
  TabConfiguration
} from "@microsoft/msfs-wtg3000-gtc";
import {TbmChecklistEvents, TbmChecklistItemState, TbmNormalChecklists} from "../../../Shared/ChecklistSystem";

import "./TbmChecklistGtcPage.css";
import {ControllableDisplayPaneIndex} from "@microsoft/msfs-wtg3000-common";
import { TbmChecklistGtcOptionsPopup } from "./TbmChecklistGtcOptionsPopup";

/**
 * GTC view keys for popups owned by checklist pages.
 */
enum GtcChecklistPagePopupKeys {
  Options = 'ChecklistOptions'
}

export class TbmChecklistGtcPage extends GtcView {
  private readonly optionsPopupKey = GtcChecklistPagePopupKeys.Options;
  private readonly listRef = FSComponent.createRef<GtcList<any>>();
  private readonly activeNormalChecklistIndex = Subject.create<number>(2);

  /** @inheritDoc */
  public onAfterRender(thisNode: VNode): void {
    super.onAfterRender(thisNode);

    this.props.gtcService.registerView(
      GtcViewLifecyclePolicy.Persistent,
      this.optionsPopupKey,
      this.props.controlMode,
      this.renderOptionsPopup.bind(this),
      this.props.displayPaneIndex
    );

    this._title.set('Checklist');
    this._activeComponent.set(this.listRef.instance);
  }

  /** @inheritDoc */
  render(): VNode {
    const tbmNormalChecklists = TbmNormalChecklists.getChecklists();

    return (
      <div class="gtc-checklist">
        <TabbedContainer
          initiallySelectedTabPosition={1}
          configuration={TabConfiguration.Left5}
        >
          <TabbedContent
            position={1}
            label="Normal"
          >
            <GtcList
              ref={this.listRef}
              bus={this.bus}
              listItemHeightPx={135}
              itemsPerPage={5}
              listItemSpacingPx={1}
              sidebarState={this._sidebarState}
              class='gtc-checklist-tab-list'
            >
              {tbmNormalChecklists.map((checklist, index) => {
                const isHighlighted = this.activeNormalChecklistIndex.map(activeIndex => activeIndex === index);
                return (
                  <GtcListItem>
                    <GtcTouchButton
                      label={checklist.name}
                      onPressed={() => {
                        this.activeNormalChecklistIndex.set(index === this.activeNormalChecklistIndex.get() ? -1 : index);
                        this.bus.getPublisher<TbmChecklistEvents>()
                          .pub('tbm_checklist_event', {
                            type: 'active_checklist_changed',
                            newActiveChecklistName: checklist.name,
                          }, true);
                      }}
                      isHighlighted={isHighlighted}
                      isInList
                      class='gtc-checklist-list-button'
                    />
                  </GtcListItem>
                );
              })}
            </GtcList>
          </TabbedContent>

          <TabbedContent position={2} label="Abnormal" disabled={true}>Abnormal checklist</TabbedContent>
        </TabbedContainer>
        <GtcTouchButton
          label={'Checklist\nOptions'}
          onPressed={() => {
            if (this.props.gtcService.activeView.get().key !== this.optionsPopupKey) {
              this.props.gtcService.openPopup(this.optionsPopupKey, 'slideout-right', 'darken');
            }
          }}
          class='gtc-checklist-options-button'
        />
      </div>
    );
  }

  /**
   * Renders this page's options popup.
   * @param gtcService The GTC service.
   * @param controlMode The control mode to which the popup belongs.
   * @param displayPaneIndex The index of the display pane associated with the popup.
   * @returns This page's options popup, as a VNode.
   */
  protected renderOptionsPopup(gtcService: GtcService, controlMode: GtcControlMode, displayPaneIndex?: ControllableDisplayPaneIndex): VNode {
    return (
      <TbmChecklistGtcOptionsPopup
        gtcService={gtcService}
        controlMode={controlMode}
        displayPaneIndex={displayPaneIndex}
      />
    );
  }
}