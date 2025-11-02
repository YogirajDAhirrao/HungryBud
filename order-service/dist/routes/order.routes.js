"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const router = (0, express_1.Router)();
// 🧾 Create a new order
router.post("/", order_controller_1.createOrder);
// 📦 Get order details by ID
router.get("/:orderId", order_controller_1.getOrder);
// 🔄 Update order status (next or cancel)
router.patch("/status/:orderId", order_controller_1.updateOrderStatus);
exports.default = router;
