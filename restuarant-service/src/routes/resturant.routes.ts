import { Router } from "express";
import {
  getRestaurantByName,
  getRestaurants,
  registerRestaurant,
} from "../controllers";
const router = Router();
router.post("/", registerRestaurant);
router.get("/", getRestaurants);
router.get("/:name", getRestaurantByName);

export default router;
