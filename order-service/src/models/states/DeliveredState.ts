import { IOrderState } from "./IOrderState";
import type { OrderContext } from "../orderContext";

export class DeliveredState implements IOrderState {
  getStatus() {
    return "Delivered";
  }
  async next(ctx: OrderContext) {
    throw new Error("Order already delivered. No next state.");
  }
  async cancel(ctx: OrderContext) {
    throw new Error("Cannot cancel delivered order.");
  }
}
