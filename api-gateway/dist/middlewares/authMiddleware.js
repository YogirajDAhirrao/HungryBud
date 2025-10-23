"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
// Middleware to verify JWT and attach user info to req
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))
        ? authHeader.split(" ")[1]
        : null;
    if (!token) {
        return res
            .status(401)
            .json({ message: "Unauthorized - No token provided" });
    }
    try {
        // ✅ Verify token
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
        // ✅ Attach user info to request
        req.user = {
            userId: decoded.userId,
            userType: decoded.userType,
        };
        // ✅ Continue to next handler
        next();
    }
    catch (error) {
        console.error("JWT verification failed:", error);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
exports.authMiddleware = authMiddleware;
