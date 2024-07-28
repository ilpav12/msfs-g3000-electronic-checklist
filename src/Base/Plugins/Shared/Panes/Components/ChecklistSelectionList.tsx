import {
  ArraySubject,
  EventBus,
  FSComponent,
  HardwareUiControlProps,
  Subject,
  Subscription,
  UiControlPropEventHandlers,
  VNode,
} from "@microsoft/msfs-sdk";
import { ControllableDisplayPaneIndex } from "@microsoft/msfs-wtg3000-common/Components/DisplayPanes/DisplayPaneTypes";
import {
  ChecklistEvents,
  ChecklistInteractionEventAction,
  ChecklistPageFocusableItemType,
  ChecklistRepository,
} from "@base/Shared/ChecklistSystem";
import { ChecklistControlList, ChecklistUiControl, FmsUiControlEvents } from "@base/Shared/UI";

import "./ChecklistSelectionList.css";

export type SelectionListProps<Names, Category> =
  | ChecklistSelectionListProps<Names, Category>
  | CategorySelectionListProps<Names, Category>;

interface BaseSelectionListProps<Names, Category>
  extends UiControlPropEventHandlers<FmsUiControlEvents>,
    HardwareUiControlProps {
  /** The event bus */
  readonly bus: EventBus;
  /** The pane index */
  readonly paneIndex: ControllableDisplayPaneIndex;
  /** The checklist repository */
  readonly repo: ChecklistRepository<Names, Category>;
  /** The focused item type. */
  readonly focusedItemType: Subject<ChecklistPageFocusableItemType>;
  /** The current category */
  readonly currentCategory: Subject<Category>;
  /** Whether the popup is open. */
  readonly isOpen: Subject<boolean>;
}

interface ChecklistSelectionListProps<Names, Category> extends BaseSelectionListProps<Names, Category> {
  /** The popup type */
  readonly type: "checklist";
  /** The items to display */
  readonly items: ArraySubject<Names>;
}

interface CategorySelectionListProps<Names, Category> extends BaseSelectionListProps<Names, Category> {
  /** The popup type */
  readonly type: "category";
  /** The items to display */
  readonly items: ArraySubject<Category>;
}

/** A selection list for checklists or categories. */
export class ChecklistSelectionList<Names, Category> extends ChecklistUiControl<SelectionListProps<Names, Category>> {
  private readonly scrollContainer = FSComponent.createRef<HTMLDivElement>();
  private readonly selectionItemListRef = FSComponent.createRef<ChecklistControlList<Names | Category>>();

  private isOpenSub?: Subscription;
  private checklistEventsSub?: Subscription;

  /** @inheritDoc */
  public onAfterRender(thisNode: VNode): void {
    super.onAfterRender(thisNode);

    this.isOpenSub = this.props.isOpen.sub((isOpen) => {
      for (let i = 0; i < this.props.items.length; i++) {
        this.selectionItemListRef.instance.getChild(i)?.setDisabled(!isOpen);
      }

      if (isOpen) {
        this.selectionItemListRef.instance.scroll("forward");
        const activeChecklist = this.props.repo.getActiveChecklistByPaneIndex(this.props.paneIndex).get();
        if (this.props.type === "category") {
          this.selectionItemListRef.instance.scrollToIndex(
            this.props.items.getArray().indexOf(activeChecklist.category),
          );
        } else {
          let index = 0;
          if (this.props.currentCategory.get() === activeChecklist.category) {
            index = this.props.items.getArray().indexOf(activeChecklist.name);
          }
          this.selectionItemListRef.instance.scrollToIndex(index);
        }
      }
    });

    this.checklistEventsSub = this.props.bus
      .getSubscriber<ChecklistEvents>()
      .on("checklist_event")
      .handle((event) => {
        if (
          this.props.isOpen.get() &&
          event.type === "checklist_interaction" &&
          event.targetPaneIndex === this.props.paneIndex
        ) {
          switch (event.action) {
            case ChecklistInteractionEventAction.Interact:
              if (this.props.type === "category") {
                this.props.currentCategory.set(
                  this.props.items.get(this.selectionItemListRef.instance.getSelectedIndex()) as Category,
                );
                this.props.isOpen.set(false);
                this.props.focusedItemType.set(ChecklistPageFocusableItemType.ChecklistSelectionList);
                return true;
              }

              const currentActiveChecklist = this.props.repo.getActiveChecklistByPaneIndex(this.props.paneIndex).get();
              this.props.bus.getPublisher<ChecklistEvents<Names, Category>>().pub(
                "checklist_event",
                {
                  type: "active_checklist_changed",
                  newActiveChecklistName: this.props.items.get(
                    this.selectionItemListRef.instance.getSelectedIndex(),
                  ) as Names,
                  newActiveChecklistCategory: this.props.currentCategory.get(),
                  targetPaneIndex: this.props.paneIndex,
                },
                true,
              );
              return true;

            case ChecklistInteractionEventAction.ScrollUp:
              if (this.selectionItemListRef.instance.getSelectedIndex() === 0) {
                return false;
              }
              this.scroll("backward");
              return true;

            case ChecklistInteractionEventAction.ScrollDown:
              if (this.selectionItemListRef.instance.getSelectedIndex() === this.props.items.length - 1) {
                return false;
              }
              this.scroll("forward");
              return true;
            default:
              return false;
          }
        }

        return false;
      });
  }

  /**
   * Renders a selection item.
   * @param item The selection item to render.
   * @returns The rendered selection item.
   */
  private renderSelectionItem(item: Names | Category): VNode {
    const ref = FSComponent.createRef<HTMLDivElement>();
    return (
      <ChecklistUiControl
        onFocused={() => ref.instance.classList.add("highlight-select")}
        onBlurred={() => ref.instance.classList.remove("highlight-select")}
        onRegistered={(control): void => control.setDisabled(true)}
      >
        <div class="checklist-category-selection-item" ref={ref}>
          {item}
        </div>
      </ChecklistUiControl>
    );
  }

  /** @inheritDoc */
  public render(): VNode {
    return (
      <div
        ref={this.scrollContainer}
        class={{
          "checklist-popup-dialog": true,
          hidden: this.props.isOpen.map((v) => !v),
        }}
      >
        <ChecklistControlList
          class="checklist-popup-selection-list"
          ref={this.selectionItemListRef}
          data={this.props.items as ArraySubject<Names | Category>}
          renderItem={this.renderSelectionItem.bind(this)}
          hideScrollbar={false}
        />
      </div>
    );
  }

  /** @inheritDoc */
  public destroy(): void {
    this.selectionItemListRef.getOrDefault()?.destroy();

    this.isOpenSub?.destroy();
    this.checklistEventsSub?.destroy();

    super.destroy();
  }
}
