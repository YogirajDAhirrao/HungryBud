import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.middleware";
import { getAllUsers } from "../controllers";
const router = Router();

router.post("/", verifyAuth, getAllUsers);
export default router;
