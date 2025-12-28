import { OrderContext } from "../orderContext";
import { IOrderState } from "./IOrderState";

export class ReadyForPickup implements IOrderState {
  getStatus(): string {
    return "ReadyForPickup";
  }
  async next(ctx: OrderContext): Promise<void> {
    ctx.setState(
      new (await import("./OutForDeliveryState")).OutForDeliveryState()
    );
  }
  async cancel(ctx: OrderContext): Promise<void> {
    ctx.setState(new (await import("./CancelledState")).CancelledState());
  }
}
