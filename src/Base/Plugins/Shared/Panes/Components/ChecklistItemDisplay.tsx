import { EventBus, FSComponent, ObjectSubject, Subject, Subscription, VNode } from "@microsoft/msfs-sdk";
import {
  ChecklistItemReadonly,
  ChecklistItemState,
  ChecklistItemType,
  ChecklistPageFocusableItemType,
  Justification,
} from "@base/Shared/ChecklistSystem";
import { ChecklistUiControl, ChecklistUiControlProps } from "@base/Shared/UI/ChecklistUiControl";

import "./ChecklistItemDisplay.css";

/** Component props for the {@link ChecklistItemDisplay} component */
export interface ChecklistItemDisplayProps<Names, Category> extends ChecklistUiControlProps {
  /** The event bus to use. */
  bus: EventBus;
  /** The checklist item to display. */
  item: ChecklistItemReadonly<Names, Category>;
  /** A function to toggle the completed status of the item. */
  toggleItemCompleted: (item: ChecklistItemReadonly<Names, Category>) => boolean;
  /** A function to set the item to incomplete. */
  setItemIncomplete: (item: ChecklistItemReadonly<Names, Category>) => void;
  /** The focused item type. */
  focusedItemType: Subject<ChecklistPageFocusableItemType>;
}

/** A display component for a checklist item. */
export class ChecklistItemDisplay<Names, Category> extends ChecklistUiControl<
  ChecklistItemDisplayProps<Names, Category>
> {
  private readonly itemRef = FSComponent.createRef<HTMLDivElement>();
  private readonly itemStyle = ObjectSubject.create({
    color: this.props.item.color,
    "font-size": `${this.props.item.fontSize + 6}px`,
  });

  private itemStateSub?: Subscription;

  /** @inheritDoc */
  public onAfterRender(thisNode: VNode): void {
    super.onAfterRender(thisNode);
    this.itemStateSub = this.props.item.state.sub((state) => {
      if (this.isFocused && this.props.item.type === ChecklistItemType.Challenge) {
        this.props.focusedItemType.set(
          state === ChecklistItemState.Completed
            ? ChecklistPageFocusableItemType.ChallengeChecked
            : ChecklistPageFocusableItemType.ChallengeUnchecked,
        );
      }
      if (this.props.item.type === ChecklistItemType.Challenge) {
        this.itemStyle.set(
          "color",
          state === ChecklistItemState.Completed ? "var(--checklist-color-green)" : this.props.item.color,
        );
      }
    }, true);
  }

  /** @inheritDoc */
  protected onFocused(): void {
    this.itemRef.instance.classList.add("checklist-focus");
    let type = ChecklistPageFocusableItemType.Text;
    if (this.props.item.type === ChecklistItemType.Challenge) {
      type =
        this.props.item.state.get() === ChecklistItemState.Completed
          ? ChecklistPageFocusableItemType.ChallengeChecked
          : ChecklistPageFocusableItemType.ChallengeUnchecked;
    }
    if (this.props.item.type === ChecklistItemType.Link) {
      type = ChecklistPageFocusableItemType.Link;
    }
    this.props.focusedItemType.set(type);
  }

  /** @inheritDoc */
  protected onBlurred(): void {
    this.itemRef.instance.classList.remove("checklist-focus");
  }

  /**
   * Renders the checklist item based on its type.
   * @returns The checklist item VNode.
   */
  private renderItem(): VNode {
    const justificationClasses = {
      "justify-left": this.props.item.justification === Justification.Left,
      "justify-center": this.props.item.justification === Justification.Center,
      "justify-right": this.props.item.justification === Justification.Right,
      "indent-1": this.props.item.justification === Justification.Indent1,
      "indent-2": this.props.item.justification === Justification.Indent2,
      "indent-3": this.props.item.justification === Justification.Indent3,
      "indent-4": this.props.item.justification === Justification.Indent4,
    };

    switch (this.props.item.type) {
      case ChecklistItemType.Challenge:
        return (
          <div
            class={{
              "checklist-challenge": true,
              completed: this.props.item.state.map((v) => v === ChecklistItemState.Completed),
            }}
          >
            <div class="checklist-challenge-content">
              <svg width="30px" height="30px" viewBox="0 0 36 36">
                <path
                  class="checklist-challenge-border"
                  d="M 8.5 23.5 L 8.5 8.5 L 23.5 8.5"
                  transform="matrix(1.125,0,0,1.125,0,0)"
                  stroke="#CECECE"
                  stroke-width="1"
                  fill="none"
                />
                <path
                  class="checklist-challenge-border"
                  d="M 23.5 8.5 L 23.5 24 M 23.5 23.5 L 8.5 23.5"
                  transform="matrix(1.125,0,0,1.125,0,0)"
                  stroke="#8B8B8B"
                  stroke-width="1"
                  fill="none"
                />
                <path
                  class="checklist-challenge-mark"
                  d="M 9 15 L 15 22 L 23 12"
                  transform="matrix(1.125,0,0,1.125,0,0)"
                  stroke="#00FF00"
                  stroke-width="3"
                  fill="none"
                />
              </svg>
              <div
                class={{
                  "checklist-challenge-title": true,
                  "all-width": !this.props.item.response,
                  ...justificationClasses,
                }}
                style={this.itemStyle}
              >
                {this.props.item.content}
              </div>
              <div
                class={{
                  "checklist-challenge-dotted-spacer": true,
                  hidden: !this.props.item.response,
                }}
                style={this.itemStyle}
              >
                <div>......................................................................</div>
              </div>
              <div class="checklist-challenge-spacer" />
              <div
                class={{
                  "checklist-challenge-response": true,
                  hidden: !this.props.item.response,
                }}
                style={this.itemStyle}
              >
                {this.props.item.response}
              </div>
            </div>
            {this.props.item.imagePath && (
              <img
                class={{
                  "checklist-image": true,
                }}
                src={this.props.item.imagePath}
                alt={this.props.item.imagePath.split("/").pop()}
              />
            )}
          </div>
        );
      case ChecklistItemType.Text:
      case ChecklistItemType.Link:
        return (
          <>
            <div
              class={{
                ...justificationClasses,
              }}
              style={this.itemStyle}
            >
              {this.props.item.content}
            </div>
            {this.props.item.imagePath && (
              <img
                class={{
                  "checklist-image": true,
                }}
                src={this.props.item.imagePath}
                alt={this.props.item.imagePath.split("/").pop()}
              />
            )}
          </>
        );
      default:
        return <></>;
    }
  }

  /** @inheritDoc */
  public render(): VNode {
    return (
      <div
        class={{
          "checklist-item-display": true,
          "blanks-below-1": this.props.item.blanksBelow === 1,
          "blanks-below-2": this.props.item.blanksBelow === 2,
          "blanks-below-3": this.props.item.blanksBelow === 3,
          "blanks-below-4": this.props.item.blanksBelow === 4,
          "blanks-below-5": this.props.item.blanksBelow === 5,
          "blanks-below-6": this.props.item.blanksBelow === 6,
          "blanks-below-7": this.props.item.blanksBelow === 7,
          "blanks-below-8": this.props.item.blanksBelow === 8,
          "blanks-below-9": this.props.item.blanksBelow === 9,
          "blanks-below-10": this.props.item.blanksBelow === 10,
        }}
        ref={this.itemRef}
      >
        {this.renderItem()}
      </div>
    );
  }

  /** @inheritDoc */
  public destroy(): void {
    this.itemStateSub?.destroy();

    super.destroy();
  }
}
