import { Request, Response, NextFunction } from "express";

export const extractUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers["x-user-id"] as string;
  const userType = req.headers["x-user-type"] as string;
  console.log(userId);
  if (!userId || !userType) {
    return res.status(401).json({ message: "User headers missing" });
  }

  req.userId = userId;
  req.userType = userType;
  next();
};
