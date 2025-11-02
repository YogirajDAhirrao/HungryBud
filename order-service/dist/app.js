"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const extractUser_middleware_1 = require("./middlewares/extractUser.middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(extractUser_middleware_1.extractUser);
// Mount all order routes under /orders
app.use("/order", order_routes_1.default);
exports.default = app;
