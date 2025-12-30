import { prisma } from "../lib/prisma.js";

export const deliveryPartnerService = {
  async registerPartner(userId: string) {
    return prisma.deliveryPartner.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        isOnline: false,
        isActive: true,
      },
    });
  },
  async setOnline(userId: string, isOnline: boolean) {
    return prisma.deliveryPartner.update({
      where: { id: userId },
      data: { isOnline },
    });
  },
  async findAvailablePartner() {
    return prisma.deliveryPartner.findFirst({
      where: {
        isOnline: true,
        isActive: true,
      },
    });
  },
};
