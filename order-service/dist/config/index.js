"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
console.log({ path: path_1.default.resolve(process.cwd(), ".env") });
exports.config = {
    port: process.env.PORT || 3003,
    jwtSecret: process.env.JWT_SECRET || "Supersecret",
    DATABASE_URL: process.env.DATABASE_URL
};
