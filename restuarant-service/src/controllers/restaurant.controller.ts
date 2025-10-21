import { Request, Response } from "express";
import { restaurantService } from "../services/restaurant.service";

export const registerRestaurant = async (req: Request, res: Response) => {
  try {
    const { name, address, phone } = req.body;

    if (req.userType !== "RESTAURANT_OWNER") {
      return res
        .status(403)
        .json({ error: "Only restaurant owners can register" });
    }

    const owner = req.userId;
    if (!owner) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const result = await restaurantService.createRestaurant(
      name,
      address,
      phone,
      owner
    );

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register restaurant" });
  }
};

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const result = await restaurantService.getAllRestaurant();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Failed to get all restaurants" });
  }
};

export const getRestaurantByName = async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const result = await restaurantService.getRestaurantByName(name);

    if (!result) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching restaurant by name:", error);
    res.status(500).json({ error: "Failed to get restaurant by name" });
  }
};
