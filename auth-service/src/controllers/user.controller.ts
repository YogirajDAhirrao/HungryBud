import { Request, Response } from "express";
import { userService } from "../services/user.service";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUser();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
