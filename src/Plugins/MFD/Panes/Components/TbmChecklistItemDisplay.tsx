import { FSComponent, Subject, VNode } from '@microsoft/msfs-sdk';
import { TbmChecklistItemReadonly, TbmChecklistItemState, TbmChecklistItemType, TbmChecklistPageFocusableItemType } from "../../../Shared/ChecklistSystem";
import {TbmChecklistUiControl, TbmChecklistUiControlProps} from "../../../Shared/UI/TbmChecklistUiControl";

/** Component props for the {@link TbmChecklistItemDisplay} component */
export interface TbmChecklistItemDisplayProps extends TbmChecklistUiControlProps {
  /** The checklist item to display. */
  item: TbmChecklistItemReadonly
  /** A function to toggle the completed status of the item. */
  toggleItemCompleted: (item: TbmChecklistItemReadonly) => boolean;
  /** A function to set the item to incomplete. */
  setItemIncomplete: (item: TbmChecklistItemReadonly) => void;
  /** The focused item type. */
  focusedItemType: Subject<TbmChecklistPageFocusableItemType>;
}

/** A display component for a TBM checklist item. */
export class TbmChecklistItemDisplay extends TbmChecklistUiControl<TbmChecklistItemDisplayProps> {
  private readonly itemRef = FSComponent.createRef<HTMLDivElement>();

  /** @inheritDoc */
  public onAfterRender(thisNode: VNode): void {
    super.onAfterRender(thisNode);
    this.props.item.state.sub(state => {
      if (this.isFocused && this.props.item.type === TbmChecklistItemType.Checkbox) {
        this.props.focusedItemType.set(state === TbmChecklistItemState.Completed ?
          TbmChecklistPageFocusableItemType.CheckboxChecked :
          TbmChecklistPageFocusableItemType.CheckboxUnchecked);
      }
    }, true);
  }

  /** @inheritDoc */
  onEnter(): boolean {
    return this.props.toggleItemCompleted(this.props.item);
  }

  /** @inheritDoc */
  onClr(): boolean {
    this.props.setItemIncomplete(this.props.item);
    return true;
  }

  /** @inheritDoc */
  protected onFocused(): void {
    this.itemRef.instance.classList.add('checklist-focus');
    this.props.focusedItemType.set(
      this.props.item.type === TbmChecklistItemType.Checkbox ?
        this.props.item.state.get() === TbmChecklistItemState.Completed ?
          TbmChecklistPageFocusableItemType.CheckboxChecked :
          TbmChecklistPageFocusableItemType.CheckboxUnchecked :
        TbmChecklistPageFocusableItemType.Text
    );
  }

  /** @inheritDoc */
  protected onBlurred(): void {
    this.itemRef.instance.classList.remove('checklist-focus');
  }

  /**
   * Renders the checklist item based on its type.
   * @returns The checklist item VNode.
   */
  private renderItem(): VNode {
    switch (this.props.item.type) {
      case TbmChecklistItemType.Checkbox:
        return this.renderCheckboxItem(this.props.item.level || 1);
      case TbmChecklistItemType.Text:
        return this.renderTextItem();
      case TbmChecklistItemType.Section:
        return this.renderSectionTitleItem();
    }
  }

  /**
   * Renders a checkbox item.
   * @param level The level of nesting of the checkbox item.
   * @returns The checkbox item VNode.
   */
  private renderCheckboxItem(level: number): VNode {
    const title = (this.props.item.title || '').replace(new RegExp('\n', "g"), '<br>');
    const action = this.props.item.action && this.props.item.action.replace(new RegExp('\n', "g"), '<br>');

    return (
      <div class={{
        'tbm-checklist-checkbox': true ,
        'level-2': level === 2,
        'level-3': level === 3,
        'completed': this.props.item.state.map(v => v === TbmChecklistItemState.Completed)
      }}>
        <svg width="32px" height="32px" viewBox="0 0 32 32" style="flex-shrink: 0">
          <path class="tbm-checklist-checkbox-border" d="M 8.5 23.5 L 8.5 8.5 L 23.5 8.5" stroke="#CECECE" stroke-width="1" fill="none"/>
          <path class="tbm-checklist-checkbox-border" d="M 23.5 8.5 L 23.5 24 M 23.5 23.5 L 8.5 23.5" stroke="#8B8B8B" stroke-width="1" fill="none"/>
          <path class="tbm-checklist-checkbox-mark" d="M 9 15 L 15 22 L 23 12" stroke="#00FF00" stroke-width="3" fill="none"/>
        </svg>
        <div class="tbm-checklist-checkbox-title">{title}</div>
        <div class={{
          'tbm-checklist-checkbox-spacer': true,
          'hidden': !this.props.item.action
        }}>
          <div>......................................................................</div>
        </div>
        <div class={{
          'tbm-checklist-checkbox-action': true,
          'hidden': !this.props.item.action
        }}>{action}</div>
      </div>
    );
  }

  /**
   * Renders a text item.
   * @returns The text item VNode.
   */
  private renderTextItem(): VNode {
    if (this.props.item.textNode) {
      return this.props.item.textNode();
    }
    return <></>;
  }

  /**
   * Renders a section title item.
   * @returns The section title item VNode.
   */
  private renderSectionTitleItem(): VNode {
    return <div class="tbm-checklist-section-title">{this.props.item.title}</div>;
  }

  /** @inheritDoc */
  public render(): VNode {
    return (
      <div class={{
        'tbm-checklist-item-display': true,
        'extended-margin-below': !!this.props.item.extendedMarginBelow
      }} ref={this.itemRef}>{this.renderItem()}</div>
    );
  }
}