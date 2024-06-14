import {
  ArraySubject,
  EventBus,
  FocusPosition,
  FSComponent,
  HardwareUiControlProps,
  MathUtils,
  Subject,
  Subscribable,
  UiControlPropEventHandlers,
  VNode
} from "@microsoft/msfs-sdk";
import {
  ChecklistEvent,
  ChecklistEvents,
  ChecklistInteractionEventAction,
  ChecklistItem,
  ChecklistItemInteractionType,
  ChecklistItemReadonly,
  ChecklistItemState,
  ChecklistItemType,
  ChecklistPageFocusableItemType,
  ChecklistReadonly,
  ChecklistRepository
} from "@base/Shared/ChecklistSystem";
import {ChecklistControlList, ChecklistUiControl, FmsUiControlEvents} from "@base/Shared/UI/ChecklistUiControl";
import {ChecklistItemDisplay} from "@base/Shared/Panes/Components/ChecklistItemDisplay";
import {NextChecklistControl} from "@base/Shared/Panes/Components/ChecklistNextButton";
import {ControllableDisplayPaneIndex} from "@microsoft/msfs-wtg3000-common/Components/DisplayPanes/DisplayPaneTypes";
import {
  ChecklistCategorySelectionControl,
  ChecklistSelectionControl
} from "@base/Shared/Panes/Components/ChecklistSelectionUiControl";

import './ChecklistDisplay.css';

/** Component props for the {@link ChecklistDisplay} component */
export interface ChecklistDisplayProps<Names, Category> extends UiControlPropEventHandlers<FmsUiControlEvents>, HardwareUiControlProps {
  /** The event bus */
  bus: EventBus;
  /** The checklist repository */
  repo: ChecklistRepository<Names, Category>;
  /** The checklist to display. */
  checklist: Subscribable<ChecklistReadonly<Names, Category>>;
  /** Whether the checklist is completed. */
  isChecklistCompleted: Subscribable<boolean>;
  /** The focused item type. */
  focusedItemType: Subject<ChecklistPageFocusableItemType>;
  /** The pane index. */
  paneIndex: ControllableDisplayPaneIndex;
}

export class ChecklistDisplay<Names, Category> extends ChecklistUiControl<ChecklistDisplayProps<Names, Category>> {
  private readonly scrollContainer = FSComponent.createRef<HTMLDivElement>();
  protected readonly checklistItemListRef = FSComponent.createRef<ChecklistControlList<ChecklistItemReadonly>>();

  private items = ArraySubject.create<ChecklistItemReadonly>([]);

  private previousIndex = 0;
  private ensureIndexInView: ((index: number, pinDirection: 'none' | 'top' | 'bottom') => void) | undefined;

  private readonly warnChecklistNotCompleted = Subject.create<boolean>(false);

  private readonly isChecklistCategoryPopupOpen = Subject.create(false);
  private readonly isChecklistPopupOpen = Subject.create(false);

  public onAfterRender(node: VNode) {
    super.onAfterRender(node);

    this.props.checklist.sub(checklist => {
      this.items.set([...checklist.items]);
      this.previousIndex = 0;
      this.checklistItemListRef.instance.focus(FocusPosition.MostRecent);
    }, true);

    this.ensureIndexInView = this.checklistItemListRef.instance.ensureIndexInView.bind(this.checklistItemListRef.instance);
    this.checklistItemListRef.instance.ensureIndexInView = this.replaceEnsureIndexInView.bind(this);

    this.props.bus.getSubscriber<ChecklistEvents>().on('checklist_event').handle(this.onChecklistInteraction.bind(this));

    // Needed to handle the case where the last item is a challenge
    this.props.isChecklistCompleted.sub(isComplete => {
      if (isComplete) {
        this.warnChecklistNotCompleted.set(false);
      }
    }, true);
  }

  /**
   * Handles checklist interactions.
   * @param event The checklist event.
   * @returns Whether the required action was successful.
   */
  private onChecklistInteraction(event: ChecklistEvent<any, any>): boolean {
    if (this.isChecklistCategoryPopupOpen.get() || this.isChecklistPopupOpen.get()) {
      return false;
    }

    if (event.type === 'checklist_interaction' && event.targetPaneIndex === this.props.paneIndex) {
      switch (event.action) {
        case ChecklistInteractionEventAction.Interact:
          if (this.props.focusedItemType.get() === ChecklistPageFocusableItemType.ChecklistCategorySelectionList) {
            this.isChecklistCategoryPopupOpen.set(true);
            return true;
          }
          if (this.props.focusedItemType.get() === ChecklistPageFocusableItemType.ChecklistSelectionList) {
            this.isChecklistPopupOpen.set(true);
            return true;
          }
          if (this.props.focusedItemType.get() === ChecklistPageFocusableItemType.NextChecklist) {
            return this.goToNextChecklist();
          }
          return this.toggleItemCompletedStatus(this.items.get(this.previousIndex));
        case ChecklistInteractionEventAction.ScrollUp:
          console.log('ChecklistDisplay: ScrollUp')
          this.scroll('backward');
          return true;
        case ChecklistInteractionEventAction.ScrollDown:
          if (this.props.focusedItemType.get() === ChecklistPageFocusableItemType.NextChecklist) {
            return false;
          }
          this.scroll('forward');
          return true;
        default:
          return false;
      }
    }

    if (event.type === 'check_all_items' && event.checklistName === this.props.checklist.get().name) {
      this.checklistItemListRef.instance.focus(FocusPosition.Last);
      return this.scroll('forward'); // Scroll once more for "Go to next checklist"
    }

    if (event.type === 'checklist_reset' && event.checklistName === this.props.checklist.get().name) {
      return this.checklistItemListRef.instance.focus(FocusPosition.First);
    }

    return false;
  }

  /**
   * Toggle the completed status of the item.
   * @param item The item to toggle the completed status of.
   * @returns Whether the required action was successful.
   */
  private toggleItemCompletedStatus(item: ChecklistItemReadonly): boolean {
    if (item && item.type === ChecklistItemType.Challenge) {
      const checklist = this.props.checklist.get();
      const itemIndex = checklist.items.indexOf(item);
      // Scroll forward if we're completing the item, don't scroll if we're resetting the item to incomplete
      if (item.state.get() === ChecklistItemState.Incomplete) {
        this.scroll('forward');
      }
      if (itemIndex >= 0) {
        this.props.bus.getPublisher<ChecklistEvents<Names, Category>>()
          .pub('checklist_event', {
            type: 'item_changed',
            checklistName: checklist.name,
            checklistCategory: checklist.category,
            itemIndex: itemIndex,
            itemState: item.state.get() === ChecklistItemState.Completed ? ChecklistItemState.Incomplete : ChecklistItemState.Completed,
          }, true);
        return true;
      }
    } else if (item && this.props.focusedItemType.get() === ChecklistPageFocusableItemType.Link) {
      if (item.linkTarget) {
        this.props.bus.getPublisher<ChecklistEvents<Names, Category>>()
          .pub('checklist_event', {
            type: 'active_checklist_changed',
            newActiveChecklistName: item.linkTarget.checklistName as Names,
            newActiveChecklistCategory: item.linkTarget.checklistCategory as Category,
            targetPaneIndex: this.props.paneIndex,
          }, true);
        return true;
      }
      return false;
    } else if (item && this.props.focusedItemType.get() === ChecklistPageFocusableItemType.Text) {
      this.scroll('forward');
      return true;
    }
    return false;
  }

  /**
   * Sets the item to incomplete.
   * @param item The item to set to incomplete.
   */
  private setItemIncomplete(item: ChecklistItemReadonly): void {
    if (item && item.type === ChecklistItemType.Challenge && item.state.get() === ChecklistItemState.Completed) {
      const checklist = this.props.checklist.get();
      const itemIndex = checklist.items.indexOf(item);
      if (itemIndex >= 0) {
        this.props.bus.getPublisher<ChecklistEvents<Names, Category>>()
          .pub('checklist_event', {
            type: 'item_changed',
            checklistName: checklist.name,
            checklistCategory: checklist.category,
            itemIndex: itemIndex,
            itemState: ChecklistItemState.Incomplete,
          });
      }
    }
  }

  /**
   * Dispatches as event to go to the next checklist.
   * @returns Whether the required action was successful.
   */
  private goToNextChecklist(): boolean {
    this.props.bus.getPublisher<ChecklistEvents<Names, Category>>()
      .pub('checklist_event', {
        type: 'next_checklist',
        checklistName: this.props.checklist.get().name,
        checklistCategory: this.props.checklist.get().category,
        targetPaneIndex: this.props.paneIndex,
      });
    return true;
  }

  /**
   * Renders the checklist items.
   * @param item The checklist item.
   * @returns The checklist items VNode.
   */
  private renderChecklistItem(item: ChecklistItem): VNode {
    return (
      <ChecklistItemDisplay
        bus={this.props.bus}
        item={item}
        onRegistered={(control): void => control.setDisabled(item.interactionType === ChecklistItemInteractionType.NoScrollStop)}
        toggleItemCompleted={this.toggleItemCompletedStatus.bind(this)}
        setItemIncomplete={this.setItemIncomplete.bind(this)}
        focusedItemType={this.props.focusedItemType}
      />
    );
  }

  /**
   * A function to override the stock G1000ControlList.ensureIndexInView function to scroll the checklist display with an offset.
   * @param index The index to ensure is in view.
   * @param pinDirection The direction to pin the item to.
   */
  public replaceEnsureIndexInView(index: number, pinDirection: 'none' | 'top' | 'bottom' = 'none'): void {
    let offsetIndex;
    // if the new index is equal to the previous index,
    // we shouldn't offset the scroll as we aren't actively scrolling
    // (probably freshly loaded checklist)
    if (index === this.previousIndex) {
      offsetIndex = index;
    } else if (index < this.previousIndex) {
      offsetIndex = index - 3;
      let totalHeight = 0;
      for (let i = 1; i <= Math.min(3, index); i++) {
        totalHeight += this.props.checklist.get().items[index - i].height;
        if (totalHeight >= 3) {
          offsetIndex = index - i;
          break;
        }
      }
    } else {
      offsetIndex = index + 8;
      let totalHeight = 0;
      for (let i = 1; i <= Math.min(8, this.items.length - index - 1); i++) {
        totalHeight += this.props.checklist.get().items[index + i].height;
        if (totalHeight >= 8) {
          offsetIndex = index + i;
          break;
        }
      }
    }
    offsetIndex = MathUtils.clamp(offsetIndex, 0, this.items.length - 1);
    this.ensureIndexInView && this.ensureIndexInView(offsetIndex, pinDirection);
    this.previousIndex = index;
  }

  /** @inheritDoc */
  public render(): VNode {
    return (
      <div class="checklist-page-container">
        <div class="checklist-selection-container">
          <ChecklistCategorySelectionControl
            bus={this.props.bus}
            paneIndex={this.props.paneIndex}
            repo={this.props.repo}
            focusedItemType={this.props.focusedItemType}
            isPopupOpen={this.isChecklistCategoryPopupOpen}
          />
          <ChecklistSelectionControl
            bus={this.props.bus}
            paneIndex={this.props.paneIndex}
            repo={this.props.repo}
            focusedItemType={this.props.focusedItemType}
            isPopupOpen={this.isChecklistPopupOpen}
          />
        </div>
        <div class="checklist-container">
          <div class="checklist-display-container">
            <div class="checklist-display" ref={this.scrollContainer}>
              <ChecklistControlList
                class="checklist-display-list"
                ref={this.checklistItemListRef}
                data={this.items}
                renderItem={this.renderChecklistItem.bind(this)}
                hideScrollbar={false}
              />
            </div>
            <div class={{
              'checklist-completed-label': true,
              'hidden': this.props.isChecklistCompleted.map(v => !v)
            }}>
              * Checklist Finished *
            </div>
            <div class={{
              'checklist-not-completed-label': true,
              'hidden': this.warnChecklistNotCompleted.map(v => !v)
            }}>
              * Checklist Not Finished *
            </div>
            <NextChecklistControl
              bus={this.props.bus}
              isLast={this.props.checklist.map(v => v.isLastChecklist)}
              onFocused={() => {
                this.props.focusedItemType.set(ChecklistPageFocusableItemType.NextChecklist);
                if (!this.props.isChecklistCompleted.get()) {
                  this.warnChecklistNotCompleted.set(true);
                }
              }}
              onBlurred={() => {
                this.warnChecklistNotCompleted.set(false);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}