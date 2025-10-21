import { Router } from "express";
import {
  addMenuItem,
  deleteMenuItem,
  getRestaurantMenu,
  updateMenuItem,
} from "../controllers";
const router = Router();
router.get("/:restaurantId", getRestaurantMenu);
router.post("/:restaurantId", addMenuItem);
router.post("/update/:itemId", updateMenuItem);
router.delete("/delete/:itemId", deleteMenuItem);
export default router;
