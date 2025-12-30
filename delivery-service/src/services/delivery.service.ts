import { prisma } from "../lib/prisma.js";
import { deliveryPartnerService } from "./deliveryPartner.service.js";

export const deliveryService = {
  async createDelivery(orderId: string) {
    // idempotency
    const existing = await prisma.delivery.findUnique({
      where: { orderId },
    });
    if (existing) return existing;

    // create delivery
    const delivery = await prisma.delivery.create({
      data: {
        orderId,
        status: "DELIVERY_CREATED",
      },
    });

    // attempt assignment
    const partner = await deliveryPartnerService.findAvailablePartner();
    if (partner) {
      await prisma.delivery.update({
        where: { id: delivery.id },
        data: {
          agentId: partner.id,
          status: "AGENT_ASSIGNED",
        },
      });
    }

    return delivery;
  },
};
