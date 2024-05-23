import {
  FSComponent,
  HardwareControlListProps,
  HardwareUiControl, HardwareUiControlList,
  HardwareUiControlProps, HEvent,
  UiControlEventHandler,
  UiControlPropEventHandlers, VNode
} from "@microsoft/msfs-sdk";
import { ScrollBar } from "./ScrollBar";
import {TbmChecklistEvents} from "../ChecklistSystem/TbmChecklistEvents";


export type FmsUiControlEvents = Record<keyof TbmChecklistEvents, UiControlEventHandler<TbmChecklistUiControl>>

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
    return (<ScrollBar />);
  }
}