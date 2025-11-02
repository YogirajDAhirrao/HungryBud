import express from "express";
import cors from "cors";

import restaurantRoutes from "./routes/resturant.routes";
import menuItemRoutes from "./routes/menu.routes";
import { extractUser } from "./middlewares/extractUser.middleware";
const app = express();
app.use(cors());
app.use(express.json());

app.use(extractUser);

app.use("/restaurants", restaurantRoutes);
app.use("/restaurant/menu", menuItemRoutes);
export default app;
