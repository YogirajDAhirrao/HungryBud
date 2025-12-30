import { deliveryClient } from "../clients/deliveryClients";
import prisma from "../prisma/client";
import { IOrderState } from "./states/IOrderState";

// Order context (holds state + order data)
export class OrderContext {
  private _state: IOrderState;
  public orderId: string;
  public orderData: any;

  constructor(orderId: string, state: IOrderState, orderData?: any) {
    this.orderId = orderId;
    this._state = state;
    this.orderData = orderData;
  }

  getState() {
    return this._state;
  }

  async setState(state: IOrderState) {
    this._state = state;
    if (state.getStatus() === "ReadyForPickup") {
      const delivery = await deliveryClient.createDelivery(this.orderId);
      this.orderData.deliveryId = delivery.deliveryId;
    }
  }
  getStatus() {
    return this._state.getStatus();
  }
  // persist the state to DB (atomic usage recommended in service layer)
  async persistStatus() {
    await prisma.order.update({
      where: { id: this.orderId },  
      data: {
        status: this._state.getStatus(),
        deliveryId: this.orderData?.deliveryId,
      },
    });
  }

  // helper to perform transition and persist in DB atomically (but see service for transaction)
  async transitionAndPersist(action: "next" | "cancel") {
    if (action === "next") await this._state.next(this);
    else await this._state.cancel(this);
    await this.persistStatus();
  }
}
