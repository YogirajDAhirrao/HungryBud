import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.middleware";
import { getAllUsers } from "../controllers";
const router = Router();

router.get("/", verifyAuth, getAllUsers);
export default router;
