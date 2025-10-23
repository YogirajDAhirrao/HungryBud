import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import { config } from "./config";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();
app.use(cors());
// app.use(express.json());🧩 Why This Happens

// You have in both Gateway and Auth Service:
// app.use(express.json());
// express.json() uses raw-body internally to parse the body.
// If the request is sent through the proxy from the gateway to auth service, the body can be lost or already read, causing raw-body to throw an error:
// Error [ERR_STREAM_PREMATURE_CLOSE]: request body stream closed unexpectedly
// Happens if the gateway doesn’t forward the body properly or Content-Length/Content-Type headers mismatch.

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: config.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/auth": "/api/auth" },
  })
);

app.use(
  "/api/users",
  createProxyMiddleware({
    target: config.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/users": "/api/users" },
  })
);

app.use(
  "/api/restaurants",
  authMiddleware,
  createProxyMiddleware({
    target: config.RESTAURANT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/restaurants": "/restaurants" },
  })
);
app.use(
  "/api/restaurant/menu",
  authMiddleware,
  createProxyMiddleware({
    target: config.RESTAURANT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/restaurant/menu": "/restaurant/menu" },
  })
);

export default app;
