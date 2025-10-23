"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const resturant_routes_1 = __importDefault(require("./routes/resturant.routes"));
const menu_routes_1 = __importDefault(require("./routes/menu.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/restaurants", resturant_routes_1.default);
app.use("/restaurant/menu", menu_routes_1.default);
exports.default = app;
