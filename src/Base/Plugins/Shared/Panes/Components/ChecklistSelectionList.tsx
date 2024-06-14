import {
  ArraySubject,
  EventBus,
  FocusPosition,
  FSComponent,
  HardwareUiControlProps, Subject,
  UiControlPropEventHandlers,
  VNode
} from "@microsoft/msfs-sdk";
import {ControllableDisplayPaneIndex} from "@microsoft/msfs-wtg3000-common/Components/DisplayPanes/DisplayPaneTypes";
import {
  ChecklistEvents,
  ChecklistInteractionEventAction,
  ChecklistRepository
} from "@base/Shared/ChecklistSystem";
import {ChecklistControlList, ChecklistUiControl, FmsUiControlEvents} from "@base/Shared/UI";

export interface ChecklistSelectionListProps<Names, Category, ItemNames> extends UiControlPropEventHandlers<FmsUiControlEvents>, HardwareUiControlProps {
  /** The event bus */
  readonly bus: EventBus;
  /** The pane index */
  readonly paneIndex: ControllableDisplayPaneIndex;
  /** The checklist repository */
  readonly repo: ChecklistRepository<Names, Category, ItemNames>;
  /** The popup type */
  readonly type: 'category' | 'checklist';
  /** The items to display */
  readonly items: ArraySubject<Names | Category>;
  /** Whether the popup is open. */
  readonly isOpen: Subject<boolean>;
}

export class ChecklistSelectionList<Names, Category, ItemNames> extends ChecklistUiControl<ChecklistSelectionListProps<Names, Category, ItemNames>> {
  protected readonly selectionItemListRef = FSComponent.createRef<ChecklistControlList<Names | Category>>();
  protected readonly scrollContainer = FSComponent.createRef<HTMLDivElement>();

  /** @inheritDoc */
  public onAfterRender(thisNode: VNode): void {
    super.onAfterRender(thisNode);
    this.selectionItemListRef.instance.focus(FocusPosition.First);

    this.props.isOpen.sub((isOpen) => {
      if (isOpen) {
        this.selectionItemListRef.instance.focus(FocusPosition.First);
      }

      for (let i = 0; i < this.props.items.length; i++) {
        this.selectionItemListRef.instance.getChild(i)?.setDisabled(!isOpen);
      }
    });

    this.props.bus.getSubscriber<ChecklistEvents>().on('checklist_event').handle((event) => {
      if (this.props.isOpen.get() && event.type === 'checklist_interaction' && event.targetPaneIndex === this.props.paneIndex) {
        console.log('ChecklistSelectionList: checklist_interaction', event.action);
        switch (event.action) {
          case ChecklistInteractionEventAction.Interact:
            if (this.props.type === 'category') {
              const newChecklist = this.props.repo.getChecklistsByCategory(this.props.items.get(this.selectionItemListRef.instance.getSelectedIndex()) as Category)[0];
              this.props.bus.getPublisher<ChecklistEvents<Names, Category>>().pub('checklist_event',
                {
                  type: 'active_checklist_changed',
                  newActiveChecklistName: newChecklist.name,
                  newActiveChecklistCategory: newChecklist.category,
                  targetPaneIndex: this.props.paneIndex,
                }, true);
            } else {
              const currentActiveChecklist = this.props.repo.getActiveChecklistByPaneIndex(this.props.paneIndex).get();
              this.props.bus.getPublisher<ChecklistEvents<Names, Category>>().pub('checklist_event',
                {
                  type: 'active_checklist_changed',
                  newActiveChecklistName: this.props.items.get(this.selectionItemListRef.instance.getSelectedIndex()) as Names,
                  newActiveChecklistCategory: currentActiveChecklist.category,
                  targetPaneIndex: this.props.paneIndex,
                }, true);
            }
            this.props.isOpen.set(false);
            return true;
          case ChecklistInteractionEventAction.ScrollUp:
            if (this.selectionItemListRef.instance.getSelectedIndex() === 0) {
              return false;
            }
            this.scroll('backward');
            return true;
          case ChecklistInteractionEventAction.ScrollDown:
            if (this.selectionItemListRef.instance.getSelectedIndex() === this.props.items.length - 1) {
              return false;
            }
            this.scroll('forward');
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
        onFocused={() => ref.instance.classList.add('highlight-select')}
        onBlurred={() => ref.instance.classList.remove('highlight-select')}
        onRegistered={(control): void => control.setDisabled(true)}
      >
        <div class="checklist-category-selection-item" ref={ref}>
          {item}
        </div>
      </ChecklistUiControl>
    );
  }

  public render(): VNode {
    return (
      <div class="checklist-popup-selection-container" ref={this.scrollContainer}>
        <ChecklistControlList
          class="checklist-selection-list"
          ref={this.selectionItemListRef}
          data={this.props.items}
          renderItem={this.renderSelectionItem.bind(this)}
          hideScrollbar={false}
        />
      </div>
    );
  }
}