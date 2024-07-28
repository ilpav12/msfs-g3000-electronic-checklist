import { EventBus, FSComponent, Subject, Subscription, VNode } from "@microsoft/msfs-sdk";
import { DisplayPaneView, DisplayPaneViewProps } from "@microsoft/msfs-wtg3000-common";
import { ControllableDisplayPaneIndex } from "@microsoft/msfs-wtg3000-common/Components/DisplayPanes/DisplayPaneTypes";
import { ChecklistUiControl } from "@base/Shared/UI/ChecklistUiControl";
import { ChecklistDisplay } from "@base/Shared/Panes/Components";
import { ChecklistPageFocusableItemType, ChecklistRepository } from "@base/Shared/ChecklistSystem";

import "./ChecklistPane.css";

/**
 * Tbm checklist display pane view keys.
 */
export enum ChecklistPaneKeys {
  Checklist = "Checklist",
}

export interface ChecklistPageProps<Names, Category> extends DisplayPaneViewProps {
  /** The event bus. */
  bus: EventBus;
  /** The checklist repository */
  repo: ChecklistRepository<Names, Category>;
}

export class ChecklistPane<Names, Category> extends DisplayPaneView<ChecklistPageProps<Names, Category>> {
  private readonly uiRoot = FSComponent.createRef<ChecklistUiControl>();
  private readonly activeChecklist = this.props.repo.getActiveChecklistByPaneIndex(
    this.props.index as ControllableDisplayPaneIndex,
  );
  public readonly focusedItemType = Subject.create(ChecklistPageFocusableItemType.ChallengeUnchecked);
  private readonly checklistDisplayRef = FSComponent.createRef<ChecklistDisplay<Names, Category>>();
  public readonly isActiveChecklistComplete = Subject.create(false);
  private activeChecklistSub?: Subscription;
  private isActiveChecklistCompletePipe?: Subscription;

  public constructor(props: ChecklistPageProps<Names, Category>) {
    super(props);

    this.activeChecklistSub = this.activeChecklist.sub((activeChecklist) => {
      this.isActiveChecklistCompletePipe?.destroy();
      this.isActiveChecklistCompletePipe = activeChecklist.isComplete.pipe(this.isActiveChecklistComplete);
    }, true);
  }

  /** @inheritDoc */
  public onAfterRender(node: VNode): void {
    super.onAfterRender(node);

    this._title.set("Checklist");
  }

  /** @inheritDoc */
  public render(): VNode {
    return (
      <div>
        <ChecklistUiControl ref={this.uiRoot}>
          <ChecklistDisplay<Names, Category>
            bus={this.props.bus}
            ref={this.checklistDisplayRef}
            focusedItemType={this.focusedItemType}
            repo={this.props.repo}
            checklist={this.activeChecklist}
            isChecklistCompleted={this.isActiveChecklistComplete}
            paneIndex={this.props.index as ControllableDisplayPaneIndex}
          />
        </ChecklistUiControl>
      </div>
    );
  }

  /** @inheritDoc */
  public destroy(): void {
    this.uiRoot.getOrDefault()?.destroy();
    this.checklistDisplayRef.getOrDefault()?.destroy();
    this.activeChecklistSub?.destroy();
    this.isActiveChecklistCompletePipe?.destroy();

    super.destroy();
  }
}
