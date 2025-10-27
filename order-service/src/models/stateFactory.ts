import { CancelledState } from "./states/CancelledState";
import { ConfirmedState } from "./states/ConfirmedState";
import { DeliveredState } from "./states/DeliveredState";
import { IOrderState } from "./states/IOrderState";
import { OutForDeliveryState } from "./states/OutForDeliveryState";
import { PendingState } from "./states/PendingState";
import { PreparingState } from "./states/PreparingState";

export function stateFromString(s: string): IOrderState {
  switch (s) {
    case "Pending":
      return new PendingState();
    case "Confirmed":
      return new ConfirmedState();
    case "Preparing":
      return new PreparingState();
    case "Out_for_delivery":
      return new OutForDeliveryState();
    case "Delivered":
      return new DeliveredState();
    case "Cancelled":
      return new CancelledState();
    default:
      return new PendingState();
  }
}
