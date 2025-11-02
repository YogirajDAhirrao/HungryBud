import express from "express";
import cors from "cors";
import orderRoutes from "./routes/order.routes";
import { extractUser } from "./middlewares/extractUser.middleware";

const app = express();
app.use(express.json());
app.use(extractUser);
// Mount all order routes under /orders
app.use("/order", orderRoutes);

export default app;
