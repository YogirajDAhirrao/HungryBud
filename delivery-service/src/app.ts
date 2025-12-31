import express from "express";
import cors from "cors";

import deliveryRouter from "./routes/delivery.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/delivery", deliveryRouter);

export default app;
