import {DisplayPaneView, DisplayPaneViewProps} from "@microsoft/msfs-wtg3000-common";
import {EventBus, FSComponent, Subject, VNode} from "@microsoft/msfs-sdk";
import { TbmChecklistUiControl } from "../../Shared/UI/TbmChecklistUiControl";
import { TbmChecklistDisplay } from "./Components/TbmChecklistDisplay";
import {
  TbmChecklistPageFocusableItemType,
  TbmChecklistRepository,
} from "../../Shared/ChecklistSystem";

import "./TbmChecklistMfdPane.css";

export interface TbmChecklistPageProps extends DisplayPaneViewProps {
  /** The event bus. */
  bus: EventBus;
  /** The checklist repository */
  repo: TbmChecklistRepository;
}

export class TbmChecklistMfdPane extends DisplayPaneView<TbmChecklistPageProps> {
  private readonly uiRoot = FSComponent.createRef<TbmChecklistUiControl>();
  private readonly activeChecklist = this.props.repo.activeChecklist;
  public readonly focusedItemType = Subject.create(TbmChecklistPageFocusableItemType.CheckboxUnchecked);

  private readonly checklistDisplayRef = FSComponent.createRef<TbmChecklistDisplay>();
  private readonly viewContainerRef = FSComponent.createRef();


  /** @inheritDoc */
  onAfterRender(node: VNode) {
    super.onAfterRender(node);

    this._title.set('Checklist');
  }


  /** @inheritDoc */
  render(): VNode {
    return (
      <div className="mfd-page" ref={ this.viewContainerRef }>
        <TbmChecklistUiControl ref={ this.uiRoot }>
          <TbmChecklistDisplay
            bus={this.props.bus}
            ref={this.checklistDisplayRef}
            focusedItemType={this.focusedItemType}
            repo={this.props.repo}
            checklist={this.activeChecklist}
            isChecklistCompleted={this.props.repo.isActiveChecklistComplete}
          />
        </TbmChecklistUiControl>
      </div>
    );
  }
}