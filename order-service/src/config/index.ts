import dotenv from "dotenv";
import path from "path";
dotenv.config();
console.log({path: path.resolve(process.cwd(),".env")});
export const config = {
    port: process.env.PORT || 3003,
     jwtSecret: process.env.JWT_SECRET || "Supersecret",
    DATABASE_URL : process.env.DATABASE_URL!
}