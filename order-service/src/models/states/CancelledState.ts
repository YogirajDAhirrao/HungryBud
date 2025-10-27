import { OrderContext } from "../orderContext";
import { IOrderState } from "./IOrderState";

export class CancelledState implements IOrderState{
    getStatus(): string {
        return "Cancelled"
    }
   async next(ctx: OrderContext) {
    throw new Error("Cancelled order cannot change state.");
  }
  async cancel(ctx: OrderContext) {
    // idempotent
    return;
  }
}