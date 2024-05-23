import {EventBus, FSComponent, HardwareUiControl, Subscribable, VNode} from '@microsoft/msfs-sdk';
import {
  FmsUiControlEvents,
  TbmChecklistUiControl,
  TbmChecklistUiControlProps
} from "../../../Shared/UI/TbmChecklistUiControl";
import {
  ChecklistInteractionEventAction,
  TbmChecklistEvents
} from "../../../Shared/ChecklistSystem/TbmChecklistEvents";

/** Component props for the {@link NextChecklistControl} component */
export interface NextChecklistControlProps extends TbmChecklistUiControlProps {
  /** The event bus */
  bus: EventBus;
  /** The function to call when the next button is clicked. */
  onEnter: () => boolean;
  /** Whether this is the last checklist. */
  isLast: Subscribable<boolean>;
}

/** A control to display the next checklist label. */
export class NextChecklistControl extends TbmChecklistUiControl<NextChecklistControlProps> {
  private readonly labelRef = FSComponent.createRef<HTMLDivElement>();

  /** @inheritDoc */
  public onAfterRender(thisNode: VNode): void {
    super.onAfterRender(thisNode);
    this.props.isLast.sub(isLast => {
      this.setDisabled(isLast);
    }, true);

    this.props.bus.getSubscriber<TbmChecklistEvents>().on('tbm_checklist_event').handle((event) => {
      if (this.isFocused && event.type === 'checklist_interaction' && event.action === ChecklistInteractionEventAction.Interact) {
        this.props.onEnter();
      }
    });
  }

  /** @inheritDoc */
  protected onFocused(source: HardwareUiControl<FmsUiControlEvents>): void {
    super.onFocused(source);
    this.labelRef.instance.classList.add('highlight-select');
  }

  /** @inheritDoc */
  protected onBlurred(source: HardwareUiControl<FmsUiControlEvents>): void {
    super.onBlurred(source);
    this.labelRef.instance.classList.remove('highlight-select');
  }

  /** @inheritDoc */
  protected onDisabled(source: HardwareUiControl<FmsUiControlEvents>): void {
    super.onDisabled(source);
    this.labelRef.instance.classList.add('disabled');
  }

  /** @inheritDoc */
  protected onEnabled(source: HardwareUiControl<FmsUiControlEvents>): void {
    super.onEnabled(source);
    this.labelRef.instance.classList.remove('disabled');
  }

  /** @inheritDoc */
  public render(): VNode {
    return <div class="tbm-next-checklist-label" ref={this.labelRef}>
      Go to Next Checklist?
    </div>;
  }
}