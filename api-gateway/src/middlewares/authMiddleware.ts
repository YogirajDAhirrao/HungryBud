import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

interface JwtPayload {
  userId: string;
  userType: string;
}

// Middleware to verify JWT and attach user info to req
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    // ✅ Attach user info to request
    (req as any).user = {
      userId: decoded.userId,
      userType: decoded.userType,
    };

    // ✅ Continue to next handler
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
    