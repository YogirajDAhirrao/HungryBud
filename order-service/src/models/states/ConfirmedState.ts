import { OrderContext } from "../orderContext";
import { IOrderState } from "./IOrderState";

export class ConfirmedState implements IOrderState {
  getStatus(): string {
    return "Confirmed";
  }
  async next(ctx: OrderContext) {
    ctx.setState(new (await import("./PreparingState")).PreparingState());
  }

  async cancel(ctx: OrderContext) {
    // allowed to cancel before preparing
    ctx.setState(new (await import("./CancelledState")).CancelledState());
  }
}
