import { OrderContext } from "../orderContext";
import { IOrderState } from "./IOrderState";

export class PreparingState implements IOrderState {
  getStatus(): string {
    return "Preparing";
  }
  async next(ctx: OrderContext): Promise<void> {
    ctx.setState(new (await import("./ReadyForPickup")).ReadyForPickup());
  }
  async cancel(ctx: OrderContext): Promise<void> {
    // block cancellation while preparing
    throw new Error("Cannot cancel order while PREPARING");
  }
}
