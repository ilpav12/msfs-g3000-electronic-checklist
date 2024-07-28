import { ArraySubject, EventBus, FSComponent, Subject, Subscription, VNode } from "@microsoft/msfs-sdk";
import { ControllableDisplayPaneIndex } from "@microsoft/msfs-wtg3000-common/Components/DisplayPanes/DisplayPaneTypes";
import { ChecklistRepository, ChecklistPageFocusableItemType, ChecklistEvents } from "@base/Shared/ChecklistSystem";
import { ChecklistUiControl, ChecklistUiControlProps } from "@base/Shared/UI";
import { ChecklistSelectionList } from "@base/Shared/Panes/Components/ChecklistSelectionList";

/** Component props for the {@link ChecklistSelectionUiControl} component */
interface ChecklistSelectionUIProps<Names, Category> extends ChecklistUiControlProps {
  /** The event bus */
  bus: EventBus;
  /** The pane paneIndex. */
  paneIndex: ControllableDisplayPaneIndex;
  /** The checklist repository */
  repo: ChecklistRepository<Names, Category>;
  /** The focused item type. */
  focusedItemType: Subject<ChecklistPageFocusableItemType>;
  /** Whether the category popup is open. */
  isCategoryPopupOpen: Subject<boolean>;
  /** Whether the checklist popup is open. */
  isChecklistPopupOpen: Subject<boolean>;
}

interface ChecklistSelectionProps<Names, Category> extends ChecklistUiControlProps {
  /** The event bus */
  bus: EventBus;
  /** The pane paneIndex. */
  paneIndex: ControllableDisplayPaneIndex;
  /** The checklist repository */
  repo: ChecklistRepository<Names, Category>;
  /** The focused item type. */
  focusedItemType: Subject<ChecklistPageFocusableItemType>;
  /** Whether the popup is open. */
  isOpen: Subject<boolean>;
  /** The current category */
  currentCategory: Subject<Category>;
}

/** A base component for the checklist/category selection. */
export class ChecklistSelectionUiControl<Names, Category> extends ChecklistUiControl<
  ChecklistSelectionUIProps<Names, Category>
> {
  protected readonly currentCategory = Subject.create(
    this.props.repo.getActiveChecklistByPaneIndex(this.props.paneIndex).get().category,
  );

  private currentCategorySub?: Subscription;

  /** @inheritDoc */
  public onAfterRender(node: VNode) {
    super.onAfterRender(node);

    this.currentCategorySub = this.currentCategory.sub((category) => {
      this.currentCategory.set(category);
    });
  }

  /** @inheritDoc */
  public render(): VNode {
    return (
      <>
        <ChecklistCategorySelectionControl<Names, Category>
          bus={this.props.bus}
          paneIndex={this.props.paneIndex}
          repo={this.props.repo}
          focusedItemType={this.props.focusedItemType}
          currentCategory={this.currentCategory}
          isOpen={this.props.isCategoryPopupOpen}
        />
        <ChecklistSelectionControl<Names, Category>
          bus={this.props.bus}
          paneIndex={this.props.paneIndex}
          repo={this.props.repo}
          focusedItemType={this.props.focusedItemType}
          currentCategory={this.currentCategory}
          isOpen={this.props.isChecklistPopupOpen}
        />
      </>
    );
  }

  /** @inheritDoc */
  public destroy(): void {
    this.currentCategorySub?.destroy();

    super.destroy();
  }
}

/** A component which displays the selected category, and opens the category selection popup. */
class ChecklistCategorySelectionControl<Names, Category> extends ChecklistUiControl<
  ChecklistSelectionProps<Names, Category>
> {
  private readonly paragraphRef = FSComponent.createRef<HTMLParagraphElement>();
  private readonly items = ArraySubject.create(this.props.repo.getChecklistCategories());

  private isOpenSub?: Subscription;
  private checklistEventsSub?: Subscription;

  /** @inheritDoc */
  public onAfterRender(node: VNode): void {
    super.onAfterRender(node);

    this.isOpenSub = this.props.isOpen.sub((isOpen) => {
      if (isOpen) {
        this.paragraphRef.instance.classList.remove("highlight-select");
      }
    });

    this.checklistEventsSub = this.props.bus
      .getSubscriber<ChecklistEvents<Names, Category>>()
      .on("checklist_event")
      .handle((event) => {
        if (event.type === "active_checklist_changed" && event.targetPaneIndex === this.props.paneIndex) {
          this.props.currentCategory.set(event.newActiveChecklistCategory);
        }
      });
  }

  /** @inheritDoc */
  public onFocused(): void {
    this.paragraphRef.instance.classList.add("highlight-select");
    this.props.focusedItemType.set(ChecklistPageFocusableItemType.ChecklistCategorySelectionList);
  }

  /** @inheritDoc */
  public onBlurred(): void {
    this.paragraphRef.instance.classList.remove("highlight-select");
  }

  /** @inheritDoc */
  public render(): VNode {
    return (
      <>
        <div class="checklist-category">
          <p ref={this.paragraphRef}>{this.props.currentCategory.map((v) => v)}</p>
          <ChecklistSelectionList<Names, Category>
            bus={this.props.bus}
            paneIndex={this.props.paneIndex}
            repo={this.props.repo}
            type={"category"}
            items={this.items}
            focusedItemType={this.props.focusedItemType}
            currentCategory={this.props.currentCategory}
            isOpen={this.props.isOpen}
          />
        </div>
      </>
    );
  }

  /** @inheritDoc */
  public destroy(): void {
    this.items.clear();
    this.isOpenSub?.destroy();
    this.checklistEventsSub?.destroy();

    super.destroy();
  }
}

/** A component which displays the selected checklist, and opens the checklist selection popup. */
class ChecklistSelectionControl<Names, Category> extends ChecklistUiControl<ChecklistSelectionProps<Names, Category>> {
  private readonly paragraphRef = FSComponent.createRef<HTMLParagraphElement>();
  private readonly items = ArraySubject.create(
    this.props.repo
      .getChecklistsByCategory(this.props.repo.getActiveChecklistByPaneIndex(this.props.paneIndex).get().category)
      .map((v) => v.name),
  );

  private isOpenSub?: Subscription;
  private checklistEventsSub?: Subscription;
  private currentCategorySub?: Subscription;

  /** @inheritDoc */
  public onAfterRender(node: VNode) {
    super.onAfterRender(node);

    this.isOpenSub = this.props.isOpen.sub((isOpen) => {
      if (isOpen) {
        this.paragraphRef.instance.classList.remove("highlight-select");
      }
    });

    this.checklistEventsSub = this.props.bus
      .getSubscriber<ChecklistEvents<Names, Category>>()
      .on("checklist_event")
      .handle((event) => {
        if (event.type === "active_checklist_changed" && event.targetPaneIndex === this.props.paneIndex) {
          this.items.set(this.props.repo.getChecklistsByCategory(event.newActiveChecklistCategory).map((v) => v.name));
        }
      });

    this.currentCategorySub = this.props.currentCategory.sub((category) => {
      this.items.set(this.props.repo.getChecklistsByCategory(category).map((v) => v.name));
    });
  }

  /** @inheritDoc */
  public onFocused(): void {
    this.paragraphRef.instance.classList.add("highlight-select");
    this.props.focusedItemType.set(ChecklistPageFocusableItemType.ChecklistSelectionList);
  }

  /** @inheritDoc */
  public onBlurred(): void {
    this.paragraphRef.instance.classList.remove("highlight-select");
  }

  /** @inheritDoc */
  public render(): VNode {
    return (
      <>
        <div class="checklist-title">
          <p ref={this.paragraphRef}>
            {this.props.repo.getActiveChecklistByPaneIndex(this.props.paneIndex).map((v) => v.name)}
          </p>
          <ChecklistSelectionList<Names, Category>
            bus={this.props.bus}
            paneIndex={this.props.paneIndex}
            repo={this.props.repo}
            type={"checklist"}
            items={this.items}
            focusedItemType={this.props.focusedItemType}
            currentCategory={this.props.currentCategory}
            isOpen={this.props.isOpen}
          />
        </div>
      </>
    );
  }

  /** @inheritDoc */
  public destroy(): void {
    this.items.clear();
    this.isOpenSub?.destroy();
    this.checklistEventsSub?.destroy();
    this.currentCategorySub?.destroy();

    super.destroy();
  }
}
