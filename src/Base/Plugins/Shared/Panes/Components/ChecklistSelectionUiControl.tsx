import {ArraySubject, EventBus, FSComponent, Subject, VNode} from '@microsoft/msfs-sdk';
import {ControllableDisplayPaneIndex} from "@microsoft/msfs-wtg3000-common/Components/DisplayPanes/DisplayPaneTypes";
import {ChecklistRepository, ChecklistPageFocusableItemType, ChecklistEvents} from "@base/Shared/ChecklistSystem";
import {ChecklistUiControl, ChecklistUiControlProps} from "@base/Shared/UI";
import {ChecklistSelectionPopup} from "@base/Shared/Panes/Components/ChecklistSelectionPopup";

import './ChecklistSelection.css';

/** Component props for the {@link ChecklistSelectionUiControl} component */
export interface ChecklistSelectionProps<Names, Category> extends ChecklistUiControlProps {
  /** The event bus */
  bus: EventBus;
  /** The pane paneIndex. */
  paneIndex: ControllableDisplayPaneIndex;
  /** The checklist repository */
  repo: ChecklistRepository<Names, Category>;
  /** The focused item type. */
  focusedItemType: Subject<ChecklistPageFocusableItemType>;
  /** Whether the popup is open. */
  isPopupOpen: Subject<boolean>;
}

/** A base component for the checklist/category selection. */
class ChecklistSelectionUiControl<Names, Category> extends ChecklistUiControl<ChecklistSelectionProps<Names, Category>> {
  protected readonly ref = FSComponent.createRef<HTMLSpanElement>();

  /** @inheritDoc */
  public onAfterRender(node: VNode): void {
    super.onAfterRender(node);

    this.props.isPopupOpen.sub((isOpen) => {
      if (isOpen) {
        this.ref.instance.classList.remove('highlight-select')
      }
    });
  }

  /**
   * Adds the highlight to the item and sets the currently focused item type.
   */
  public onFocused(): void {
    this.ref.instance.classList.add('highlight-select');
  }

  /**
   * Removed the highlight from the item.
   */
  public onBlurred(): void {
    this.ref.instance.classList.remove('highlight-select');
  }

    /** @inheritDoc */
  public render(): VNode {
    return <div ref={this.ref} class="hidden"></div>;
  }
}

/** A component which displays the selected category, and opens the category selection popup. */
export class ChecklistCategorySelectionControl<Names, Category> extends ChecklistSelectionUiControl<Names, Category> {
  private readonly items = ArraySubject.create(this.props.repo.getChecklistCategories());

  /** @inheritDoc */
  public onFocused(): void {
    super.onFocused();
    this.props.focusedItemType.set(ChecklistPageFocusableItemType.ChecklistCategorySelectionList);
  }

  /** @inheritDoc */
  public render(): VNode {
    return (
      <>
        <div class="checklist-category">
          <span ref={this.ref}>{this.props.repo.getActiveChecklistByPaneIndex(this.props.paneIndex).map(v => v.category)}</span>
          <ChecklistSelectionPopup
            bus={this.props.bus}
            paneIndex={this.props.paneIndex}
            repo={this.props.repo}
            type={'category'}
            items={this.items}
            isOpen={this.props.isPopupOpen}
          />
        </div>
      </>
    );
  }
}

/** A component which displays the selected checklist, and opens the checklist selection popup. */
export class ChecklistSelectionControl<Names, Category> extends ChecklistSelectionUiControl<Names, Category> {
  private readonly items = ArraySubject.create(this.props.repo.getChecklistsByCategory(this.props.repo.getActiveChecklistByPaneIndex(this.props.paneIndex).get().category).map(v => v.name));

  /** @inheritDoc */
  public onFocused(): void {
    super.onFocused();
    this.props.focusedItemType.set(ChecklistPageFocusableItemType.ChecklistSelectionList);

    this.props.bus.getSubscriber<ChecklistEvents<Names, Category>>().on('checklist_event').handle((event) => {
      if (event.type === 'active_checklist_changed' && event.targetPaneIndex === this.props.paneIndex) {
        this.items.set(this.props.repo.getChecklistsByCategory(event.newActiveChecklistCategory).map(v => v.name));
      }
    });
  }

  /** @inheritDoc */
  public render(): VNode {
    return (
      <>
        <div class="checklist-title">
          <span ref={this.ref}>{this.props.repo.getActiveChecklistByPaneIndex(this.props.paneIndex).map(v => v.name)}</span>
          <ChecklistSelectionPopup
            bus={this.props.bus}
            paneIndex={this.props.paneIndex}
            repo={this.props.repo}
            type={'checklist'}
            items={this.items}
            isOpen={this.props.isPopupOpen}
          />
        </div>
      </>
    );
  }
}