"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractUser = void 0;
const extractUser = (req, res, next) => {
    const userId = req.headers["x-user-id"];
    const userType = req.headers["x-user-type"];
    console.log(userId);
    if (!userId || !userType) {
        return res.status(401).json({ message: "User headers missing" });
    }
    req.userId = userId;
    req.userType = userType;
    next();
};
exports.extractUser = extractUser;
