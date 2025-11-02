import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "Supersecret",
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || "http://localhost:3001",
  RESTAURANT_SERVICE_URL:
    process.env.RESTAURANT_SERVICE_URL || "http://localhost:3002",
  ORDER_SERVICE_URL: process.env.ORDER_SERVICE_URL || "http://localhost:3003",
};
