import jwt from "jsonwebtoken";
import { config } from "../config";
export const generateToken = (userId: String, userType: string) => {
  const payload = {
    userId,
    userType,
  };
  return jwt.sign(payload, config.jwtSecret, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret);
};
