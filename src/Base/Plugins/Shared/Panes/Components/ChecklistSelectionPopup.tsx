import {
  ArraySubject,
  ComponentProps,
  DisplayComponent,
  EventBus,
  FSComponent,
  Subject,
  VNode
} from '@microsoft/msfs-sdk';
import {ControllableDisplayPaneIndex} from "@microsoft/msfs-wtg3000-common/Components/DisplayPanes/DisplayPaneTypes";
import {ChecklistUiControl} from '@base/Shared/UI';
import {ChecklistSelectionList} from "@base/Shared/Panes/Components/ChecklistSelectionList";
import {ChecklistRepository} from "@base/Shared/ChecklistSystem";

import './ChecklistSelectionPopup.css';

export interface ChecklistSelectionPopupProps<Names, Category, ItemNames> extends ComponentProps {
  /** The event bus. */
  readonly bus: EventBus;
  /** The pane index. */
  readonly paneIndex: ControllableDisplayPaneIndex;
  /** The checklist repository */
  readonly repo: ChecklistRepository<Names, Category, ItemNames>;
  /** The popup type. */
  readonly type: 'category' | 'checklist',
  /** The items to display. */
  readonly items: ArraySubject<Names | Category>;
  /** Whether the popup is open. */
  readonly isOpen: Subject<boolean>;
}

/** A popup for selecting a checklist. */
export class ChecklistSelectionPopup<Names, Category, ItemNames> extends DisplayComponent<ChecklistSelectionPopupProps<Names, Category, ItemNames>> {
  protected readonly controlRef = FSComponent.createRef<ChecklistUiControl>();

  /** @inheritDoc */
  public render(): VNode {
    return (
      <div class={{
        "checklist-popup-dialog": true,
        "hidden": this.props.isOpen.map(v => !v)
      }}>
        <ChecklistSelectionList<Names, Category, ItemNames>
          ref={this.controlRef}
          bus={this.props.bus}
          paneIndex={this.props.paneIndex}
          repo={this.props.repo}
          type={this.props.type}
          items={this.props.items}
          isOpen={this.props.isOpen}
        />
      </div>
    );
  }
}