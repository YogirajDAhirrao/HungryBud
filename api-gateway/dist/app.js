"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const config_1 = require("./config");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// app.use(express.json());🧩 Why This Happens
// You have in both Gateway and Auth Service:
// app.use(express.json());
// express.json() uses raw-body internally to parse the body.
// If the request is sent through the proxy from the gateway to auth service, the body can be lost or already read, causing raw-body to throw an error:
// Error [ERR_STREAM_PREMATURE_CLOSE]: request body stream closed unexpectedly
// Happens if the gateway doesn’t forward the body properly or Content-Length/Content-Type headers mismatch.
app.use("/api/auth", (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: config_1.config.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/auth": "/api/auth" },
}));
app.use("/api/users", (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: config_1.config.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/users": "/api/users" },
}));
app.use("/api/restaurants", authMiddleware_1.authMiddleware, (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: config_1.config.RESTAURANT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/restaurants": "/restaurants" },
}));
app.use("/api/restaurant/menu", authMiddleware_1.authMiddleware, (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: config_1.config.RESTAURANT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/restaurant/menu": "/restaurant/menu" },
}));
exports.default = app;
