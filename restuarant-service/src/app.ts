import express from "express";
import cors from "cors";

import restaurantRoutes from "./routes/resturant.routes";
import menuItemRoutes from "./routes/menu.routes";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/restaurants", restaurantRoutes);
app.use("/restaurant/menu", menuItemRoutes);
export default app;
