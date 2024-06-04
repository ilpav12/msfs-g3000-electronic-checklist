import {EventBus, FSComponent, Subject, VNode} from "@microsoft/msfs-sdk";
import {DisplayPaneView, DisplayPaneViewProps} from "@microsoft/msfs-wtg3000-common";
import {ChecklistUiControl} from "@base/Shared/UI/ChecklistUiControl";
import {ChecklistDisplay} from "@base/Shared/Panes/Components";
import {
  ChecklistPageFocusableItemType,
  ChecklistRepository,
} from "@base/Shared/ChecklistSystem";

import "./ChecklistPane.css";

/**
 * Tbm checklist display pane view keys.
 */
export enum ChecklistPaneKeys {
  Checklist = 'Checklist',
}

export interface TbmChecklistPageProps extends DisplayPaneViewProps {
  /** The event bus. */
  bus: EventBus;
  /** The checklist repository */
  repo: ChecklistRepository;
}

export class ChecklistPane extends DisplayPaneView<TbmChecklistPageProps> {
  private readonly uiRoot = FSComponent.createRef<ChecklistUiControl>();
  private readonly activeChecklist = this.props.repo.activeChecklist;
  public readonly focusedItemType = Subject.create(ChecklistPageFocusableItemType.ChallengeUnchecked);

  private readonly checklistDisplayRef = FSComponent.createRef<ChecklistDisplay>();

  /** @inheritDoc */
  onAfterRender(node: VNode) {
    super.onAfterRender(node);

    this._title.set('Checklist');
  }

  /** @inheritDoc */
  render(): VNode {
    return (
      <div>
        <ChecklistUiControl ref={this.uiRoot}>
          <ChecklistDisplay
            bus={this.props.bus}
            ref={this.checklistDisplayRef}
            focusedItemType={this.focusedItemType}
            repo={this.props.repo}
            checklist={this.activeChecklist}
            isChecklistCompleted={this.props.repo.isActiveChecklistComplete}
          />
        </ChecklistUiControl>
      </div>
    );
  }
}