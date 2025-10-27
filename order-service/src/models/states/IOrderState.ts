// State interface
import type { OrderContext } from "../orderContext";
export interface IOrderState{
    next(ctx: OrderContext):Promise<void>;
    cancel(ctx: OrderContext):Promise<void>;
    getStatus():string;

}