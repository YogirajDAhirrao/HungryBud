"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), ".env") });
exports.config = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "Supersecret",
    AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || "http://localhost:3001",
    RESTAURANT_SERVICE_URL: process.env.RESTAURANT_SERVICE_URL || "http://localhost:3002",
};
