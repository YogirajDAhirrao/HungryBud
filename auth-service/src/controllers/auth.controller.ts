import { Request, Response } from "express";
import { authService } from "../services/auth.service";

// Allowed userType values (matches your schema comment)
const ALLOWED_USER_TYPES = [
  "CUSTOMER",
  "RESTAURANT_OWNER",
  "DELIVERY_PARTNER",
  "ADMIN",
];

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, userType } = req.body;

    // Validate userType (if provided)
    if (userType && !ALLOWED_USER_TYPES.includes(userType)) {
      throw new Error(
        `Invalid userType. Must be one of: ${ALLOWED_USER_TYPES.join(", ")}`
      );
    }

    // Pass userType to service (or undefined → Prisma defaults to "CUSTOMER")
    const result = await authService.register(
      name,
      email,
      password,
      userType // Optional: undefined = "CUSTOMER"
    );
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
