"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrder = exports.createOrder = void 0;
const orderService_1 = require("../services/orderService");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.userId;
        const { restaurantId, items } = req.body;
        // 🔒 Authentication check
        if (!customerId) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        // ✅ Basic validation
        if (!restaurantId || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                error: "Restaurant ID and items are required",
            });
        }
        // ✅ Item-level validation
        for (const item of items) {
            if (!item.menuItemId ||
                !item.quantity ||
                !item.price ||
                !item.restaurantId) {
                return res.status(400).json({
                    error: "Each item must have menuItemId, quantity, price, and restaurantId fields.",
                });
            }
        }
        // ✅ Create the order
        const order = yield orderService_1.orderService.createOrder(customerId, restaurantId, items);
        return res.status(201).json({
            message: "Order created successfully",
            order,
        });
    }
    catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({
            error: error.message || "Failed to create order",
        });
    }
});
exports.createOrder = createOrder;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        if (!orderId)
            return res.status(400).json({ error: "Order ID required" });
        const result = yield orderService_1.orderService.getOrder(orderId);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error fetching order:", error);
        res.status(404).json({ error: error.message || "Order not found" });
    }
});
exports.getOrder = getOrder;
// 🔄 Transition order status (next/cancel)
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const { action } = req.body;
        if (!orderId || !action)
            return res
                .status(400)
                .json({ error: "Order ID and action are required" });
        if (!["next", "cancel"].includes(action))
            return res.status(400).json({ error: "Invalid action" });
        const updated = yield orderService_1.orderService.transitionOrder(orderId, action);
        res.status(200).json({
            message: `Order status updated successfully via '${action}'`,
            order: updated,
        });
    }
    catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ error: error.message || "Failed to update order" });
    }
});
exports.updateOrderStatus = updateOrderStatus;
