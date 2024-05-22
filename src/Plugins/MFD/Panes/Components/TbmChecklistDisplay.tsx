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
  TbmChecklistEvents,
  TbmChecklistItem,
  TbmChecklistItemReadonly,
  TbmChecklistItemState,
  TbmChecklistItemType,
  TbmChecklistPageFocusableItemType,
  TbmChecklistReadonly,
  TbmChecklistRepository
} from "../../../Shared/ChecklistSystem";
import {
  FmsUiControlEvents,
  TbmChecklistControlList,
  TbmChecklistUiControl
} from "../../../Shared/UI/TbmChecklistUiControl";
import {TbmChecklistItemDisplay} from "./TbmChecklistItemDisplay";
import {NextChecklistControl} from "./TbmChecklistNextbutton";
import {TbmChecklistGtcInteractionEvent} from "../../../Shared/Events/TbmChecklistGtcInteractionEvent";

import './TbmChecklistDisplay.css';

/** Component props for the {@link TbmChecklistDisplay} component */
export interface TbmChecklistDisplayProps extends UiControlPropEventHandlers<FmsUiControlEvents>, HardwareUiControlProps {
  /** The event bus */
  bus: EventBus;
  /** The checklist repository */
  repo: TbmChecklistRepository;
  /** The pane index. */
  index: number;
  /** The checklist to display. */
  checklist: Subscribable<TbmChecklistReadonly>;
  /** Whether the checklist is completed. */
  isChecklistCompleted: Subscribable<boolean>;
  /** The focused item type. */
  focusedItemType: Subject<TbmChecklistPageFocusableItemType>;
}

export class TbmChecklistDisplay extends TbmChecklistUiControl<TbmChecklistDisplayProps> {
  private readonly scrollContainer = FSComponent.createRef<HTMLDivElement>();
  protected readonly checklistItemListRef = FSComponent.createRef<TbmChecklistControlList<TbmChecklistItemReadonly>>();

  private items = ArraySubject.create<TbmChecklistItemReadonly>([]);

  private previousIndex = 0;
  private ensureIndexInView: ((index: number, pinDirection: 'none' | 'top' | 'bottom') => void) | undefined;

  public onAfterRender(node: VNode) {
    super.onAfterRender(node);

    this.props.checklist.sub(checklist => {
      this.items.set([...checklist.items]);
      this.previousIndex = 0;
      this.checklistItemListRef.instance.focus(FocusPosition.MostRecent);
    }, true);

    this.ensureIndexInView = this.checklistItemListRef.instance.ensureIndexInView.bind(this.checklistItemListRef.instance);
    this.checklistItemListRef.instance.ensureIndexInView = this.replaceEnsureIndexInView.bind(this);

    this.props.bus.getSubscriber<TbmChecklistGtcInteractionEvent>().on("checklist_interact").handle(() => this.toggleItemCompletedStatus(this.items.get(this.previousIndex)));
    this.props.bus.getSubscriber<TbmChecklistGtcInteractionEvent>().on("checklist_scroll_up").handle(() => this.scroll('backward'));
    this.props.bus.getSubscriber<TbmChecklistGtcInteractionEvent>().on("checklist_scroll_down").handle(() => this.scroll('forward'));
  }

  /**
   * Toggle the completed status of the item.
   * @param item The item to toggle the completed status of.
   * @returns Whether the required action was successful.
   */
  private toggleItemCompletedStatus(item: TbmChecklistItemReadonly): boolean {
    if (item && item.type === TbmChecklistItemType.Checkbox) {
      const checklist = this.props.checklist.get();
      const itemIndex = checklist.items.indexOf(item);
      // Scroll forward if we're completing the item, don't scroll if we're resetting the item to incomplete
      if (item.state.get() === TbmChecklistItemState.Incomplete) {
        this.scroll('forward');
      }
      if (itemIndex >= 0) {
        this.props.bus.getPublisher<TbmChecklistEvents>()
          .pub('tbm_checklist_event', {
            type: 'item_changed',
            checklistName: checklist.name,
            itemIndex: itemIndex,
            itemState: item.state.get() === TbmChecklistItemState.Completed ? TbmChecklistItemState.Incomplete : TbmChecklistItemState.Completed,
          });
        return true;
      }
    } else if (item && item.type === TbmChecklistItemType.Text) {
      this.scroll('forward');
      return true;
    }
    return false;
  }

  /**
   * Sets the item to incomplete.
   * @param item The item to set to incomplete.
   */
  private setItemIncomplete(item: TbmChecklistItemReadonly): void {
    if (item && item.type === TbmChecklistItemType.Checkbox && item.state.get() === TbmChecklistItemState.Completed) {
      const checklist = this.props.checklist.get();
      const itemIndex = checklist.items.indexOf(item);
      if (itemIndex >= 0) {
        this.props.bus.getPublisher<TbmChecklistEvents>()
          .pub('tbm_checklist_event', {
            type: 'item_changed',
            checklistName: checklist.name,
            itemIndex: itemIndex,
            itemState: TbmChecklistItemState.Incomplete,
          });
      }
    }
  }

  /**
   * Dispatches as event to go to the next checklist.
   * @returns Whether the required action was successful.
   */
  private goToNextChecklist(): boolean {
    this.props.bus.getPublisher<TbmChecklistEvents>()
      .pub('tbm_checklist_event', {
        type: 'next_checklist',
        checklistName: this.props.checklist.get().name,
        category: this.props.checklist.get().category,
      });
    return true;
  }

  /**
   * Renders the checklist items.
   * @param item The checklist item.
   * @returns The checklist items VNode.
   */
  private renderChecklistItem(item: TbmChecklistItem): VNode {
    return (
      <TbmChecklistItemDisplay
        item={item}
        innerKnobScroll
        onRegistered={(control): void => control.setDisabled(item.type === TbmChecklistItemType.Section)}
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
    } else {
      offsetIndex = index + 5;
    }
    offsetIndex = MathUtils.clamp(offsetIndex, 0, this.items.length - 1);
    this.ensureIndexInView && this.ensureIndexInView(offsetIndex, pinDirection);
    this.previousIndex = index;
  }

  /** @inheritDoc */
  public render(): VNode {
    return (
      <div class="tbm-checklist-page-container">
        <div class="checklist-selection-container">
          <div class="checklist-category">
            <span>{this.props.repo.activeChecklist.map(v => v.category)}</span>
          </div>
          <div class="checklist-title">
            <span>{this.props.repo.activeChecklistName}</span>
          </div>
        </div>
        <div class="checklist-container">
          <div class="tbm-checklist-display-container">
            <div class="tbm-checklist-display" ref={this.scrollContainer}>
              <TbmChecklistControlList
                class="tbm-checklist-display-list"
                innerKnobScroll
                ref={this.checklistItemListRef}
                data={this.items}
                renderItem={this.renderChecklistItem.bind(this)}
                hideScrollbar={false}
              />
            </div>
            <div class={{ 'tbm-checklist-completed-label': true, 'hidden': this.props.isChecklistCompleted.map(v => !v) }}>
              * Checklist Finished *
            </div>
            <NextChecklistControl
              // onEnter={this.goToNextChecklist.bind(this)}
              isLast={this.props.checklist.map(v => v.isLastChecklist)}
              onFocused={() => this.props.focusedItemType.set(TbmChecklistPageFocusableItemType.NextChecklist)} />
          </div>
        </div>
      </div>
    );
  }
}