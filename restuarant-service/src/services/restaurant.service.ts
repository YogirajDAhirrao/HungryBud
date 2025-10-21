import prisma from "../prisma/client";

export const restaurantService = {
  async createRestaurant(
    name: string,
    address: string,
    phone: string,
    ownerId: string
  ) {
    return prisma.restaurant.create({
      data: { name, address, phone, ownerId },
    });
  },
  async getAllRestaurant() {
    prisma.restaurant.findMany();
  },
  async getRestaurantByName(name: string) {
    return prisma.restaurant.findMany({ where: { name } });
  },
  
};
