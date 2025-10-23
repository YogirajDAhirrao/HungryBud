import { Request, Response } from "express";
import { menuService } from "../services/menu.service.js";

export const getRestaurantMenu = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const menu = await menuService.getRestaurantMenu(restaurantId);
    res.status(200).json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch restaurant menu" });
  }
};

export const addMenuItem = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const { name, description, price, imageUrl } = req.body;

    // optional: verify req.userId === restaurant.ownerId before adding

    const newItem = await menuService.addMenuItem(
      restaurantId,
      name,
      description,
      price,
      imageUrl
    );

    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add menu item" });
  }
};

export const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;
    const updatedItem = await menuService.updateMenuItem(itemId, req.body);
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update menu item" });
  }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;
    const result = await menuService.deleteMenuItem(itemId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete menu item" });
  }
};
