import {ArraySubject, FSComponent, NodeReference, Subject, Subscribable, VNode} from "@microsoft/msfs-sdk";
import {ControllableDisplayPaneIndex, DynamicListData} from "@microsoft/msfs-wtg3000-common";
import {
  GtcControlMode,
  GtcList,
  GtcListItem,
  GtcService,
  GtcTouchButton,
  GtcView,
  GtcViewLifecyclePolicy,
  GtcViewProps, SidebarState,
  TabbedContainer,
  TabbedContent,
  TabConfiguration
} from "@microsoft/msfs-wtg3000-gtc";
import { ChecklistGtcOptionsPopup } from "@base/GTC/Pages/ChecklistPage/ChecklistGtcOptionsPopup";
import {
  ChecklistRepository,
  ChecklistEvents,
} from "@base/Shared/ChecklistSystem";

import "./ChecklistGtcPage.css";

/**
 * GTC view keys for popups owned by checklist pages.
 */
enum GtcChecklistPagePopupKeys {
  Options = 'ChecklistOptions'
}

export interface ChecklistListItems<Names, Category> extends DynamicListData {
  checklistName: Names;
  checklistCategory: Category;
}

/**
 * Props for the checklist GTC page.
 */
export interface ChecklistGtcPageProps<Names, Category> extends GtcViewProps {
  /** The checklist categories to display. */
  checklistCategories: Category[];
  /** The checklist repository. */
  checklistRepository: ChecklistRepository<Names, Category>;
  /** The tabbed container arrangement configuration. */
  tabbedContainerConfiguration?: TabConfiguration;
  /** The initially selected tab position of the tabbed container. */
  initiallySelectedTabPosition?: number;
}

/**
 * The checklist GTC page.
 */
export class ChecklistGtcPage<Names, Category> extends GtcView<ChecklistGtcPageProps<Names, Category>> {
  private readonly optionsPopupKey = GtcChecklistPagePopupKeys.Options;
  private readonly activeChecklist = Subject.create(this.props.checklistRepository.getActiveChecklistByPaneIndex(this.gtcService.selectedDisplayPane.get() as ControllableDisplayPaneIndex).get());
  private readonly tabbedContainerRef = FSComponent.createRef<TabbedContainer>();

  private readonly listItemHeight = this.props.gtcService.orientation === 'horizontal' ? 135 : 72;

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

    this.gtcService.selectedDisplayPane.sub((paneIndex) => {
      this.activeChecklist.set(this.props.checklistRepository.getActiveChecklistByPaneIndex(paneIndex as ControllableDisplayPaneIndex).get());
      this.tabbedContainerRef.instance.selectTab(this.props.checklistCategories.indexOf(this.activeChecklist.get().category) + 1);
    });

    this.bus.getSubscriber<ChecklistEvents>().on('checklist_event').handle((event) => {
      if (event.type === 'active_checklist_changed' && event.targetPaneIndex === this.gtcService.selectedDisplayPane.get()) {
        this.activeChecklist.set(this.props.checklistRepository.getActiveChecklistByPaneIndex(event.targetPaneIndex as ControllableDisplayPaneIndex).get());
        this.tabbedContainerRef.instance.selectTab(this.props.checklistCategories.indexOf(this.activeChecklist.get().category) + 1);
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

  /**
   * Renders a tab for this page's tab container.
   * @param position The position of the tab.
   * @param category The tab label.
   * @returns A tab for this page's tab container, as a VNode.
   */
  protected renderTab(
    position: number,
    category: Category,
  ): VNode {
    const listRef = FSComponent.createRef<GtcList<ChecklistListItems<Names, Category>>>();
    const listItems = ArraySubject.create<ChecklistListItems<Names, Category>>(
      this.props.checklistRepository.getChecklistsByCategory(category).map((checklist) => {
        return {
          checklistName: checklist.name,
          checklistCategory: checklist.category,
        };
      }));
    const sidebarState = Subject.create<SidebarState | null>(null);

    return (
      <TabbedContent
        position={position}
        label={category as string}
        onPause={(): void => {
          this._activeComponent.set(null);
          sidebarState.set(null);
        }}
        onResume={(): void => {
          this._activeComponent.set(listRef.getOrDefault());
          sidebarState.set(this._sidebarState);
        }}
      >
        { this.renderList(listRef, listItems, sidebarState) }
      </TabbedContent>
    );
  }

  /**
   * Renders the list of checklists for a tab.
   * @param listRef The list reference.
   * @param listItems The list items.
   * @param sidebarState The sidebar state.
   * @returns The list of checklists for a tab, as a VNode.
   */
  protected renderList(
    listRef: NodeReference<GtcList<ChecklistListItems<Names, Category>>>,
    listItems: ArraySubject<ChecklistListItems<Names, Category>>,
    sidebarState: Subscribable<SidebarState | null>
  ): VNode {
    this.bus.getSubscriber<ChecklistEvents>().on('checklist_event').handle((event) => {
      if (event.type === 'active_checklist_changed' && event.targetPaneIndex === this.gtcService.selectedDisplayPane.get()) {
        const newActiveChecklistListItem = listItems.getArray().find((listItem) => {
          return listItem.checklistName === event.newActiveChecklistName && listItem.checklistCategory === event.newActiveChecklistCategory;
        });
        if (newActiveChecklistListItem) {
          listRef.instance.scrollToItem(newActiveChecklistListItem, 4, true, true);
        }
      }
    });

    return (
      <GtcList
        ref={listRef}
        bus={this.bus}
        listItemHeightPx={this.listItemHeight}
        itemsPerPage={5}
        listItemSpacingPx={1}
        sidebarState={sidebarState}
        class='gtc-checklist-tab-list'
        data={listItems}
        renderItem={(listItem) => {
          return (
            <GtcListItem>
              <GtcTouchButton
                label={listItem.checklistName as string}
                onPressed={() => {
                  this.bus.getPublisher<ChecklistEvents<Names, Category>>()
                    .pub('checklist_event', {
                      type: 'active_checklist_changed',
                      newActiveChecklistName: listItem.checklistName,
                      newActiveChecklistCategory: listItem.checklistCategory,
                      targetPaneIndex: this.gtcService.selectedDisplayPane.get() as ControllableDisplayPaneIndex,
                    }, true);
                }}
                isHighlighted={this.activeChecklist.map(checklist => checklist.name === listItem.checklistName && checklist.category === listItem.checklistCategory)}
                isInList
                class='gtc-checklist-list-button'
              />
            </GtcListItem>
          );
        }}
      />
    );
  }

  /** @inheritDoc */
  render(): VNode {
    return (
      <div class="gtc-checklist">
        <TabbedContainer
          ref={this.tabbedContainerRef}
          initiallySelectedTabPosition={this.props.initiallySelectedTabPosition}
          configuration={this.props.tabbedContainerConfiguration ?? TabConfiguration.Left5}
        >
          { this.props.checklistCategories.map((category, index) => {
            return this.renderTab(index + 1, category);
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
        activeChecklist={this.activeChecklist}
      />
    );
  }

  /** @inheritdoc */
  public destroy(): void {
    this.tabbedContainerRef.getOrDefault()?.destroy();

    super.destroy();
  }
}