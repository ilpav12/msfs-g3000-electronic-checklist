import { EventBus, FSComponent, HardwareUiControl, Subscribable, Subscription, VNode } from "@microsoft/msfs-sdk";
import { FmsUiControlEvents, ChecklistUiControl, ChecklistUiControlProps } from "@base/Shared/UI/ChecklistUiControl";

/** Component props for the {@link NextChecklistControl} component */
export interface NextChecklistControlProps extends ChecklistUiControlProps {
  /** The event bus */
  bus: EventBus;
  /** Whether this is the last checklist. */
  isLast: Subscribable<boolean>;
}

/** A control to display the next checklist label. */
export class NextChecklistControl extends ChecklistUiControl<NextChecklistControlProps> {
  private readonly labelRef = FSComponent.createRef<HTMLDivElement>();

  private isLastSub?: Subscription;

  /** @inheritDoc */
  public onAfterRender(thisNode: VNode): void {
    super.onAfterRender(thisNode);
    this.isLastSub = this.props.isLast.sub((isLast) => {
      this.setDisabled(isLast);
    }, true);
  }

  /** @inheritDoc */
  protected onFocused(source: HardwareUiControl<FmsUiControlEvents>): void {
    super.onFocused(source);
    this.isLastSub?.resume();
    this.labelRef.instance.classList.add("highlight-select");
  }

  /** @inheritDoc */
  protected onBlurred(source: HardwareUiControl<FmsUiControlEvents>): void {
    super.onBlurred(source);
    this.isLastSub?.pause();
    this.labelRef.instance.classList.remove("highlight-select");
  }

  /** @inheritDoc */
  protected onDisabled(source: HardwareUiControl<FmsUiControlEvents>): void {
    super.onDisabled(source);
    this.labelRef.instance.classList.add("disabled");
  }

  /** @inheritDoc */
  protected onEnabled(source: HardwareUiControl<FmsUiControlEvents>): void {
    super.onEnabled(source);
    this.labelRef.instance.classList.remove("disabled");
  }

  /** @inheritDoc */
  public render(): VNode {
    return (
      <div class="next-checklist-label" ref={this.labelRef}>
        Go to Next Checklist?
      </div>
    );
  }

  /** @inheritDoc */
  public destroy(): void {
    this.isLastSub?.destroy();

    super.destroy();
  }
}
