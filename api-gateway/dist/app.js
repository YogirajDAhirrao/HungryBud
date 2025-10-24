"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy")); // Import express-http-proxy
const config_1 = require("./config");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// The express.json() middleware is still not needed in the gateway
// because the proxy library streams the request body to the target service.
// app.use(express.json());
// Proxy for authentication-related endpoints
app.use("/api/auth", (0, express_http_proxy_1.default)(config_1.config.AUTH_SERVICE_URL, {
    // We use proxyReqPathResolver to handle path rewriting
    proxyReqPathResolver: (req) => {
        // The original path is already correct for the auth service
        return req.originalUrl;
    },
}));
// Proxy for user-related endpoints
app.use("/api/users", (0, express_http_proxy_1.default)(config_1.config.AUTH_SERVICE_URL, {
    proxyReqPathResolver: (req) => {
        // The original path is already correct for the auth service
        return req.originalUrl;
    },
}));
// Proxy for restaurant-related endpoints, with auth middleware
app.use("/api/restaurants", authMiddleware_1.authMiddleware, // The auth middleware is still used here
(0, express_http_proxy_1.default)(config_1.config.RESTAURANT_SERVICE_URL, {
    proxyReqPathResolver: (req) => {
        // Rewrite the path from "/api/restaurants" to "/restaurants"
        return req.originalUrl.replace("/api/restaurants", "/restaurants");
    },
}));
// Proxy for restaurant menu endpoints, with auth middleware
app.use("/api/restaurant/menu", authMiddleware_1.authMiddleware, // The auth middleware is still used here
(0, express_http_proxy_1.default)(config_1.config.RESTAURANT_SERVICE_URL, {
    proxyReqPathResolver: (req) => {
        // Rewrite the path from "/api/restaurant/menu" to "/restaurant/menu"
        return req.originalUrl.replace("/api/restaurant/menu", "/restaurant/menu");
    },
}));
exports.default = app;
