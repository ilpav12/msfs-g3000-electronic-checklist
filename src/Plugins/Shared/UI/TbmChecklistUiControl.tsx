import {
  FSComponent,
  HardwareControlListProps,
  HardwareUiControl, HardwareUiControlList,
  HardwareUiControlProps,
  UiControlEventHandler,
  UiControlPropEventHandlers, VNode
} from "@microsoft/msfs-sdk";

export type FmsUiControlEvents = Record<'temp', UiControlEventHandler<TbmChecklistUiControl>>

export interface TbmChecklistUiControlProps extends UiControlPropEventHandlers<FmsUiControlEvents>, HardwareUiControlProps {
}


export class TbmChecklistUiControl<P extends TbmChecklistUiControlProps=TbmChecklistUiControlProps> extends HardwareUiControl<FmsUiControlEvents, P> {
  onInteractionEvent(event: keyof FmsUiControlEvents): boolean {
    return false;
  }
}

export interface GarminControlListProps<T> extends UiControlPropEventHandlers<FmsUiControlEvents>, HardwareUiControlProps, HardwareControlListProps<T> {
}

export class TbmChecklistControlList<T> extends HardwareUiControlList<T, FmsUiControlEvents, GarminControlListProps<T>> {
  onInteractionEvent(event: keyof FmsUiControlEvents): boolean {
    return false;
  }

  /** @inheritdoc */
  protected renderScrollbar(): VNode {
    return (<div></div>);
  }
}