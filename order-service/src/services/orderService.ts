import { OrderContext } from "../models/orderContext";
import { stateFromString } from "../models/stateFactory";
import prisma from "../prisma/client";

// Order service — orchestrates DB + state transitions
export const orderService = {
  async createOrder(
    customerId: string,
    restaurantId: string,
    items: {
      menuItemId: string;
      restaurantId: string;
      quantity: number;
      price: number;
    }[]
  ) {
    const totalAmount = items.reduce(
      (sum, it) => sum + it.price * it.quantity,
      0
    );
    // use transaction to ensure order and items are saved together
    const order = await prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          customerId,
          restaurantId,
          totalAmount,
          status: "Placed",
          items: {
            create: items.map((it) => ({
              menuItemId: it.menuItemId,
              restaurantId: it.restaurantId,
              quantity: it.quantity,
              price: it.price,
            })),
          },
        },
        include: { items: true },
      });
      return createdOrder;
    });
    return order;
  },

  /**
   * Fetch order and load its state context
   */
  async getOrder(orderId: string) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });
    if (!order) throw new Error("Order not found");

    const state = stateFromString(order.status);
    const ctx = new OrderContext(order.id, state, order);
    return { order, ctx };
  },

  /**
   * Transition order to next or cancel state
   */
  async transitionOrder(orderId: string, action: "next" | "cancel") {
    return await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({ where: { id: orderId } });
      if (!order) throw new Error("Order not found");
      const state = stateFromString(order.status);
      const ctx = new OrderContext(order.id, state, order);

      //perform transition
      if (action === "next") await ctx.getState().next(ctx);
      else await ctx.getState().cancel(ctx);
      //persist new state
      const updated = await tx.order.update({
        where: { id: orderId },
        data: { status: ctx.getState().getStatus() },
        include: { items: true },
      });
      return updated;
    });
  },
};
