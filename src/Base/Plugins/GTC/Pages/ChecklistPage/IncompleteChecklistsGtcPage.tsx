import { ArraySubject, FSComponent, Subject, VNode } from "@microsoft/msfs-sdk";
import { ControllableDisplayPaneIndex, DynamicListData } from "@microsoft/msfs-wtg3000-common";
import {
  GtcList,
  GtcListItem,
  GtcTouchButton,
  GtcView,
  GtcViewProps,
  TabbedContent,
} from "@microsoft/msfs-wtg3000-gtc";
import { ChecklistListItems, GtcChecklistPagePopupKeys } from "@base/GTC/Pages/ChecklistPage/ChecklistGtcPage";
import { ChecklistRepository, ChecklistEvents, ChecklistReadonly } from "@base/Shared/ChecklistSystem";
import { TabbedContainer, TabConfiguration } from "@base/GTC/UI/TabbedContainer";

import "./IncompleteChecklistsGtcPage.css";

/**
 * Props for the checklist GTC page.
 */
export interface IncompleteChecklistsGtcPageProps<Names, Category> extends GtcViewProps {
  /** The checklist repository. */
  checklistRepository: ChecklistRepository<Names, Category>;
  /** The active checklist. */
  activeChecklist: Subject<ChecklistReadonly<Names, Category>>;
}

/**
 * The checklist GTC page.
 */
export class IncompleteChecklistsGtcPage<Names, Category> extends GtcView<
  IncompleteChecklistsGtcPageProps<Names, Category>
> {
  private readonly optionsPopupKey = GtcChecklistPagePopupKeys.Options;
  private readonly tabbedContainerRef = FSComponent.createRef<TabbedContainer>();
  private readonly listRef = FSComponent.createRef<GtcList<ChecklistListItems<Names, Category>>>();
  private readonly listItems = ArraySubject.create<ChecklistListItems<Names, Category>>(
    this.props.checklistRepository.getIncompleteChecklists().map((checklist) => {
      return {
        checklistName: checklist.name,
        checklistCategory: checklist.category,
      };
    }),
  );

  private readonly listItemHeight = this.props.gtcService.orientation === "horizontal" ? 135 : 88;

  /** @inheritDoc */
  public onAfterRender(thisNode: VNode): void {
    super.onAfterRender(thisNode);

    this._title.set("Incomplete Checklists");

    this._activeComponent.set(this.listRef.getOrDefault());

    this.gtcService.selectedDisplayPane.sub((paneIndex) => {
      this.props.activeChecklist.set(
        this.props.checklistRepository.getActiveChecklistByPaneIndex(paneIndex as ControllableDisplayPaneIndex).get(),
      );
    });

    this.bus
      .getSubscriber<ChecklistEvents>()
      .on("checklist_event")
      .handle((event) => {
        if (
          event.type === "active_checklist_changed" &&
          event.targetPaneIndex === this.gtcService.selectedDisplayPane.get()
        ) {
          this.props.activeChecklist.set(
            this.props.checklistRepository
              .getActiveChecklistByPaneIndex(event.targetPaneIndex as ControllableDisplayPaneIndex)
              .get(),
          );
        }
      });
  }

  /** @inheritdoc */
  public onResume(): void {
    super.onResume();

    this.tabbedContainerRef.instance.resume();
  }

  /** @inheritdoc */
  public onPause(): void {
    super.onPause();

    this.tabbedContainerRef.instance.pause();
  }

  /** @inheritDoc */
  render(): VNode {
    return (
      <div class="gtc-incomplete-checklists">
        <TabbedContainer ref={this.tabbedContainerRef} configuration={TabConfiguration.Right5}>
          <TabbedContent position={1} label={"Incomplete\nChecklists"}>
            <GtcList
              ref={this.listRef}
              bus={this.bus}
              listItemHeightPx={this.listItemHeight}
              itemsPerPage={4}
              listItemSpacingPx={4}
              sidebarState={this._sidebarState}
              class="gtc-checklist-tab-list"
              data={this.listItems.length > 0 ? this.listItems : undefined}
              renderItem={(listItem) => {
                return (
                  <GtcListItem>
                    <GtcTouchButton
                      label={listItem.checklistCategory + "<br/>" + listItem.checklistName}
                      onPressed={() => {
                        this.bus.getPublisher<ChecklistEvents<Names, Category>>().pub(
                          "checklist_event",
                          {
                            type: "active_checklist_changed",
                            newActiveChecklistName: listItem.checklistName,
                            newActiveChecklistCategory: listItem.checklistCategory,
                            targetPaneIndex: this.gtcService.selectedDisplayPane.get() as ControllableDisplayPaneIndex,
                          },
                          true,
                        );
                        this.gtcService.goBack();
                      }}
                      isHighlighted={this.props.activeChecklist.map(
                        (checklist) =>
                          checklist.name === listItem.checklistName &&
                          checklist.category === listItem.checklistCategory,
                      )}
                      isInList
                      class="gtc-checklist-list-button"
                    />
                  </GtcListItem>
                );
              }}
            >
              <p class="empty-incomplete-checklist-label">No Incomplete Checklist Pages</p>
            </GtcList>
          </TabbedContent>
        </TabbedContainer>
        <GtcTouchButton
          label={"Checklist\nOptions"}
          onPressed={() => {
            if (this.props.gtcService.activeView.get().key !== this.optionsPopupKey) {
              this.props.gtcService.openPopup(this.optionsPopupKey, "slideout-right", "darken");
            }
          }}
          class="gtc-checklist-options-button"
        />
      </div>
    );
  }

  /** @inheritdoc */
  public destroy(): void {
    this.tabbedContainerRef.getOrDefault()?.destroy();
    this.listRef.getOrDefault()?.destroy();
    this.listItems.clear();

    super.destroy();
  }
}
