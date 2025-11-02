import { error } from "console";
import { Request, Response } from "express";
import { orderService } from "../services/orderService";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const customerId = (req as any).userId;
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
      if (
        !item.menuItemId ||
        !item.quantity ||
        !item.price ||
        !item.restaurantId
      ) {
        return res.status(400).json({
          error:
            "Each item must have menuItemId, quantity, price, and restaurantId fields.",
        });
      }
    }

    // ✅ Create the order
    const order = await orderService.createOrder(
      customerId,
      restaurantId,
      items
    );

    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      error: error.message || "Failed to create order",
    });
  }
};
export const getOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    if (!orderId) return res.status(400).json({ error: "Order ID required" });

    const result = await orderService.getOrder(orderId);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Error fetching order:", error);
    res.status(404).json({ error: error.message || "Order not found" });
  }
};

// 🔄 Transition order status (next/cancel)
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { action } = req.body;

    if (!orderId || !action)
      return res
        .status(400)
        .json({ error: "Order ID and action are required" });

    if (!["next", "cancel"].includes(action))
      return res.status(400).json({ error: "Invalid action" });

    const updated = await orderService.transitionOrder(orderId, action);
    res.status(200).json({
      message: `Order status updated successfully via '${action}'`,
      order: updated,
    });
  } catch (error: any) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: error.message || "Failed to update order" });
  }
};
