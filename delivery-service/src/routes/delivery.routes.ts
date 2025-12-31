import { Router } from "express";
import { createDelivery } from "../controllers/delivery.controller.js";

const router = Router();
router.post("/", createDelivery);
export default router;
