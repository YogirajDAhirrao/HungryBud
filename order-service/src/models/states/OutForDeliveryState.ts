import { IOrderState } from "./IOrderState";
import type { OrderContext } from "../orderContext";

export class OutForDeliveryState implements IOrderState {
  getStatus() { return "Out_for_delivery"; }

  async next(ctx: OrderContext) {
    ctx.setState(new (await import("./DeliveredState")).DeliveredState());
  }

  async cancel(ctx: OrderContext) {
    throw new Error("Cannot cancel order while OUT_FOR_DELIVERY");
  }
}
