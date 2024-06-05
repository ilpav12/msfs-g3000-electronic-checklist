import {FSComponent, Subject, VNode} from "@microsoft/msfs-sdk";
import {
  ControllableDisplayPaneIndex,
  DisplayPaneControlEvents,
  DisplayPaneControlGtcIndex,
} from "@microsoft/msfs-wtg3000-common";
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
import { ChecklistGtcOptionsPopup } from "@base/GTC/Pages/ChecklistPage/ChecklistGtcOptionsPopup";
import {
  ChecklistCategory,
  ChecklistEvents,
  ChecklistNames, ChecklistRepository,
} from "@base/Shared/ChecklistSystem";
import {ItemsShowcaseChecklistNames} from "@base/Shared/ChecklistSystem/Checklists";

import "./ChecklistGtcPage.css";

/**
 * GTC view keys for popups owned by checklist pages.
 */
enum GtcChecklistPagePopupKeys {
  Options = 'ChecklistOptions'
}

/**
 * The checklist GTC page.
 */
export class ChecklistGtcPage extends GtcView {
  private readonly optionsPopupKey = GtcChecklistPagePopupKeys.Options;
  private readonly listRef = FSComponent.createRef<GtcList<any>>();
  private readonly checklistRepository = new ChecklistRepository(this.props.gtcService.bus);
  private readonly activeChecklistName = Subject.create(this.checklistRepository.getActiveChecklistNameByPaneIndex(this.gtcService.selectedDisplayPane.get() as ControllableDisplayPaneIndex).get());
  public readonly checklistCategories = [
    { name: ChecklistCategory.ItemsShowcase, checklists: ItemsShowcaseChecklistNames},
  ]

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

    this.bus.getSubscriber<ChecklistEvents>().on('checklist_event').handle((event) => {
      if (event.type === 'active_checklist_changed' && event.targetPaneIndex === this.gtcService.selectedDisplayPane.get()) {
        this.activeChecklistName.set(event.newActiveChecklistName);
      }
    });

    this.gtcService.selectedDisplayPane.sub((paneIndex) => {
      this.activeChecklistName.set(this.checklistRepository.getActiveChecklistNameByPaneIndex(paneIndex as ControllableDisplayPaneIndex).get());
    });
  }

  /** @inheritDoc */
  render(): VNode {
    return (
      <div class="gtc-checklist">
        <TabbedContainer
          initiallySelectedTabPosition={1}
          configuration={TabConfiguration.Left5}
        >
          { this.checklistCategories.map((category, index) => {
            return (
              <TabbedContent
                position={index + 1}
                label={category.name}
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
                  { Object.values(category.checklists).map((checklistName) => {
                    const isHighlighted = this.activeChecklistName.map(name => name === checklistName);
                    return (
                      <GtcListItem>
                        <GtcTouchButton
                          label={checklistName}
                          onPressed={() => {
                            this.bus.getPublisher<ChecklistEvents>()
                              .pub('checklist_event', {
                                type: 'active_checklist_changed',
                                newActiveChecklistName: checklistName,
                                targetPaneIndex: this.gtcService.selectedDisplayPane.get(),
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
            );
          })}
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
      <ChecklistGtcOptionsPopup
        gtcService={gtcService}
        controlMode={controlMode}
        displayPaneIndex={displayPaneIndex}
        activeChecklistName={this.activeChecklistName}
      />
    );
  }
}