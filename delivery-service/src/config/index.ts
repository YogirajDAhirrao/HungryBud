import dotenv from "dotenv";
dotenv.config();
export const config = {
  port: process.env.PORT || 3004,
  DatabaseUrl: process.env.DATABASE_URL,
};
