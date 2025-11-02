import { Router } from "express";
import { createOrder, getOrder, updateOrderStatus } from "../controllers/order.controller";


const router = Router();

// 🧾 Create a new order
router.post("/", createOrder);

// 📦 Get order details by ID
router.get("/:orderId", getOrder);

// 🔄 Update order status (next or cancel)
router.patch("/status/:orderId", updateOrderStatus);

export default router;
