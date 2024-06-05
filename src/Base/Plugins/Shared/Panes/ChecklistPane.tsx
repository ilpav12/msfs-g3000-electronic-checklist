import {EventBus, FSComponent, Subject, VNode} from "@microsoft/msfs-sdk";
import {DisplayPaneIndex, DisplayPaneView, DisplayPaneViewProps} from "@microsoft/msfs-wtg3000-common";
import {ChecklistUiControl} from "@base/Shared/UI/ChecklistUiControl";
import {ChecklistDisplay} from "@base/Shared/Panes/Components";
import {ChecklistPageFocusableItemType, ChecklistRepository,} from "@base/Shared/ChecklistSystem";

import "./ChecklistPane.css";
import {ControllableDisplayPaneIndex} from "@microsoft/msfs-wtg3000-common/Components/DisplayPanes/DisplayPaneTypes";

/**
 * Tbm checklist display pane view keys.
 */
export enum ChecklistPaneKeys {
  Checklist = 'Checklist',
}

export interface ChecklistPageProps extends DisplayPaneViewProps {
  /** The event bus. */
  bus: EventBus;
  /** The checklist repository */
  repo: ChecklistRepository;
}

export class ChecklistPane extends DisplayPaneView<ChecklistPageProps> {
  private readonly uiRoot = FSComponent.createRef<ChecklistUiControl>();
  private readonly activeChecklist = this.props.index === DisplayPaneIndex.LeftPfd ? this.props.repo.activeChecklistLeftPfd :
    this.props.index === DisplayPaneIndex.LeftMfd ? this.props.repo.activeChecklistLeftMfd :
      this.props.index === DisplayPaneIndex.RightMfd ? this.props.repo.activeChecklistRightMfd :
        this.props.repo.activeChecklistRightPfd;
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
            isChecklistCompleted={this.props.repo.getIsActiveChecklistCompleteByPaneIndex(this.props.index as ControllableDisplayPaneIndex)}
            paneIndex={this.props.index as ControllableDisplayPaneIndex}
          />
        </ChecklistUiControl>
      </div>
    );
  }
}