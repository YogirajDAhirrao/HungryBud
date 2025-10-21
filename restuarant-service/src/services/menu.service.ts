import prisma from "../prisma/client";

export const menuService = {
  // Get all menu items for a specific restaurant
  async getRestaurantMenu(restaurantId: string) {
    try {
      const menu = await prisma.menuItem.findMany({
        where: { restaurantId },
      });
      return menu;
    } catch (error) {
      console.error("Error fetching restaurant menu:", error);
      throw new Error("Failed to fetch restaurant menu");
    }
  },

  // Add a new menu item (owner only)
  async addMenuItem(
    restaurantId: string,
    name: string,
    description: string,
    price: number,
    imageUrl?: string
  ) {
    try {
      const newItem = await prisma.menuItem.create({
        data: {
          name,
          description,
          price,
          imageUrl,
          restaurantId,
        },
      });
      return newItem;
    } catch (error) {
      console.error("Error adding menu item:", error);
      throw new Error("Failed to add menu item");
    }
  },

  // Update menu item
  async updateMenuItem(
    id: string,
    data: Partial<{
      name: string;
      description: string;
      price: number;
      imageUrl: string;
    }>
  ) {
    try {
      const updatedItem = await prisma.menuItem.update({
        where: { id },
        data,
      });
      return updatedItem;
    } catch (error) {
      console.error("Error updating menu item:", error);
      throw new Error("Failed to update menu item");
    }
  },

  // Delete menu item
  async deleteMenuItem(id: string) {
    try {
      await prisma.menuItem.delete({
        where: { id },
      });
      return { message: "Menu item deleted successfully" };
    } catch (error) {
      console.error("Error deleting menu item:", error);
      throw new Error("Failed to delete menu item");
    }
  },
};
