import { Request, Response } from "express";
import { deliveryService } from "../services/delivery.service.js";

export const createDelivery = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: "OrderID is required" });
    }
    const delivery = await deliveryService.createDelivery(orderId);
    return res.status(201).json({
      deliveryId: delivery.id,
      status: delivery.status,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create delivery",
    });
  }
};
