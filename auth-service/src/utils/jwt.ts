import jwt from "jsonwebtoken";
import { config } from "../config";
export const generateToken = (userId: String) => {
  return jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret);
};
