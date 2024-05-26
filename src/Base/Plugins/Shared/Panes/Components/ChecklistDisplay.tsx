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
  ChecklistInteractionEventAction, TbmChecklistEvent,
  ChecklistEvents,
  ChecklistItem,
  ChecklistItemReadonly,
  ChecklistItemState,
  ChecklistItemType,
  ChecklistPageFocusableItemType,
  ChecklistReadonly,
  ChecklistRepository
} from "@base/Shared/ChecklistSystem";
import {
  FmsUiControlEvents,
  TbmChecklistControlList,
  ChecklistUiControl
} from "@base/Shared/UI/ChecklistUiControl";
import {ChecklistItemDisplay} from "@base/Shared/Panes/Components/ChecklistItemDisplay";
import {NextChecklistControl} from "@base/Shared/Panes/Components/ChecklistNextButton";

import './ChecklistDisplay.css';

/** Component props for the {@link ChecklistDisplay} component */
export interface TbmChecklistDisplayProps extends UiControlPropEventHandlers<FmsUiControlEvents>, HardwareUiControlProps {
  /** The event bus */
  bus: EventBus;
  /** The checklist repository */
  repo: ChecklistRepository;
  /** The checklist to display. */
  checklist: Subscribable<ChecklistReadonly>;
  /** Whether the checklist is completed. */
  isChecklistCompleted: Subscribable<boolean>;
  /** The focused item type. */
  focusedItemType: Subject<ChecklistPageFocusableItemType>;
}

export class ChecklistDisplay extends ChecklistUiControl<TbmChecklistDisplayProps> {
  private readonly scrollContainer = FSComponent.createRef<HTMLDivElement>();
  protected readonly checklistItemListRef = FSComponent.createRef<TbmChecklistControlList<ChecklistItemReadonly>>();

  private items = ArraySubject.create<ChecklistItemReadonly>([]);

  private previousIndex = 0;
  private ensureIndexInView: ((index: number, pinDirection: 'none' | 'top' | 'bottom') => void) | undefined;

  private readonly warnChecklistNotCompleted = Subject.create<boolean>(false);

  public onAfterRender(node: VNode) {
    super.onAfterRender(node);

    this.props.checklist.sub(checklist => {
      this.items.set([...checklist.items]);
      this.previousIndex = 0;
      this.checklistItemListRef.instance.focus(FocusPosition.MostRecent);
    }, true);

    this.ensureIndexInView = this.checklistItemListRef.instance.ensureIndexInView.bind(this.checklistItemListRef.instance);
    this.checklistItemListRef.instance.ensureIndexInView = this.replaceEnsureIndexInView.bind(this);

    this.props.bus.getSubscriber<ChecklistEvents>().on('tbm_checklist_event').handle(this.onChecklistInteraction.bind(this));
  }

  /**
   * Handles checklist interactions.
   * @param event The checklist event.
   * @returns Whether the required action was successful.
   */
  private onChecklistInteraction(event: TbmChecklistEvent): boolean {
    if (event.type === 'checklist_interaction') {
      switch (event.action) {
        case ChecklistInteractionEventAction.Interact:
          this.toggleItemCompletedStatus(this.items.get(this.previousIndex));
          return true;
        case ChecklistInteractionEventAction.ScrollUp:
          this.scroll('backward');
          return true;
        case ChecklistInteractionEventAction.ScrollDown:
          this.scroll('forward');
          return true;
        default:
          return false;
      }
    }

    if (event.type === 'check_all_items') {
      this.checklistItemListRef.instance.focus(FocusPosition.Last);
      return this.scroll('forward'); // Scroll once more for "Go to next checklist"
    }

    if (event.type === 'checklist_reset') {
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
    if (item && item.type === ChecklistItemType.Checkbox) {
      const checklist = this.props.checklist.get();
      const itemIndex = checklist.items.indexOf(item);
      // Scroll forward if we're completing the item, don't scroll if we're resetting the item to incomplete
      if (item.state.get() === ChecklistItemState.Incomplete) {
        this.scroll('forward');
      }
      if (itemIndex >= 0) {
        this.props.bus.getPublisher<ChecklistEvents>()
          .pub('tbm_checklist_event', {
            type: 'item_changed',
            checklistName: checklist.name,
            itemIndex: itemIndex,
            itemState: item.state.get() === ChecklistItemState.Completed ? ChecklistItemState.Incomplete : ChecklistItemState.Completed,
          });
        return true;
      }
    } else if (item && item.type === ChecklistItemType.Text) {
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
    if (item && item.type === ChecklistItemType.Checkbox && item.state.get() === ChecklistItemState.Completed) {
      const checklist = this.props.checklist.get();
      const itemIndex = checklist.items.indexOf(item);
      if (itemIndex >= 0) {
        this.props.bus.getPublisher<ChecklistEvents>()
          .pub('tbm_checklist_event', {
            type: 'item_changed',
            checklistName: checklist.name,
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
    this.props.bus.getPublisher<ChecklistEvents>()
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
  private renderChecklistItem(item: ChecklistItem): VNode {
    return (
      <ChecklistItemDisplay
        item={item}
        onRegistered={(control): void => control.setDisabled(item.type === ChecklistItemType.Section)}
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
      offsetIndex = index + 8;
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
                ref={this.checklistItemListRef}
                data={this.items}
                renderItem={this.renderChecklistItem.bind(this)}
                hideScrollbar={false}
                scrollContainer={this.scrollContainer}
              />
            </div>
            <div class={{
              'tbm-checklist-completed-label': true,
              'hidden': this.props.isChecklistCompleted.map(v => !v)
            }}>
              * Checklist Finished *
            </div>
            <div class={{
              'tbm-checklist-not-completed-label': true,
              'hidden': this.warnChecklistNotCompleted.map(v => !v)
            }}>
              * Checklist Not Finished *
            </div>
            <NextChecklistControl
              bus={this.props.bus}
              onEnter={this.goToNextChecklist.bind(this)}
              isLast={this.props.checklist.map(v => v.isLastChecklist)}
              onFocused={() => {
                this.props.focusedItemType.set(ChecklistPageFocusableItemType.NextChecklist);
                if (!this.props.isChecklistCompleted.get()) {
                  this.warnChecklistNotCompleted.set(true);
                }
              }}
              onBlurred={() => {
                if (this.warnChecklistNotCompleted.get()) {
                  this.warnChecklistNotCompleted.set(false);
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}