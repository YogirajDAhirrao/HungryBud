import { OrderContext } from "../orderContext";
import { IOrderState } from "./IOrderState";

export class PendingState implements IOrderState {
  getStatus(): string {
    return "Pending";
  }
  async next(ctx: OrderContext): Promise<void> {
    ctx.setState(new (await import("./ConfirmedState")).ConfirmedState());
  }
  async cancel(ctx: OrderContext): Promise<void> {
    ctx.setState(new (await import("./CancelledState")).CancelledState());
  }
}
