import express from "express";
import cors from "cors";
import proxy from "express-http-proxy"; // Import express-http-proxy
import { config } from "./config";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();
app.use(cors());

// The express.json() middleware is still not needed in the gateway
// because the proxy library streams the request body to the target service.
// app.use(express.json());

// Proxy for authentication-related endpoints
app.use(
  "/api/auth",
  proxy(config.AUTH_SERVICE_URL, {
    // We use proxyReqPathResolver to handle path rewriting
    proxyReqPathResolver: (req) => {
      // The original path is already correct for the auth service
      return req.originalUrl;
    },
  })
);

// Proxy for user-related endpoints
app.use(
  "/api/users",
  proxy(config.AUTH_SERVICE_URL, {
    proxyReqPathResolver: (req) => {
      // The original path is already correct for the auth service
      return req.originalUrl;
    },
  })
);

// Proxy for restaurant-related endpoints, with auth middleware
app.use(
  "/api/restaurants",
  authMiddleware, // The auth middleware is still used here
  proxy(config.RESTAURANT_SERVICE_URL, {
    proxyReqPathResolver: (req) => {
      // Rewrite the path from "/api/restaurants" to "/restaurants"
      return req.originalUrl.replace("/api/restaurants", "/restaurants");
    },
  })
);

// Proxy for restaurant menu endpoints, with auth middleware
app.use(
  "/api/restaurant/menu",
  authMiddleware, // The auth middleware is still used here
  proxy(config.RESTAURANT_SERVICE_URL, {
    proxyReqPathResolver: (req) => {
      // Rewrite the path from "/api/restaurant/menu" to "/restaurant/menu"
      return req.originalUrl.replace("/api/restaurant/menu", "/restaurant/menu");
    },
  })
);

export default app;
