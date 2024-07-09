import {
  FSComponent,
  HardwareControlListProps,
  HardwareUiControl,
  HardwareUiControlList,
  HardwareUiControlProps,
  UiControlEventHandler,
  UiControlPropEventHandlers,
  VNode,
} from "@microsoft/msfs-sdk";
import { ScrollBar } from "@base/Shared/UI/ScrollBar";
import { ChecklistEvents } from "@base/Shared/ChecklistSystem/ChecklistEvents";

export type FmsUiControlEvents = Record<keyof ChecklistEvents, UiControlEventHandler<ChecklistUiControl>>;

export interface ChecklistUiControlProps
  extends UiControlPropEventHandlers<FmsUiControlEvents>,
    HardwareUiControlProps {}

export class ChecklistUiControl<P extends ChecklistUiControlProps = ChecklistUiControlProps> extends HardwareUiControl<
  FmsUiControlEvents,
  P
> {
  onInteractionEvent(event: keyof FmsUiControlEvents): boolean {
    return false;
  }
}

export interface GarminControlListProps<T>
  extends UiControlPropEventHandlers<FmsUiControlEvents>,
    HardwareUiControlProps,
    HardwareControlListProps<T> {}

export class ChecklistControlList<T> extends HardwareUiControlList<T, FmsUiControlEvents, GarminControlListProps<T>> {
  onInteractionEvent(event: keyof FmsUiControlEvents): boolean {
    return false;
  }

  /** @inheritdoc */
  protected renderScrollbar(): VNode {
    return <ScrollBar />;
  }
}
