# 🍔 HungryBud Backend

### **Production Grade Backend.**

**HungryBud** is a scalable, microservices-based **Food Ordering System** where users can register, explore restaurants, browse menus, and place food orders — all through a distributed backend built with **Node.js, TypeScript, and PostgreSQL**.

---

## 📘 Table of Contents

* [Introduction](#introduction)
* [Installation](#installation)
* [Architecture Overview](#architecture-overview)
* [Project Structure](#project-structure)
* [Services Overview](#services-overview)
* [API Gateway](#api-gateway)
* [Middleware](#middleware)
* [Controllers](#controllers)
* [Authentication](#authentication)
* [Error Handling](#error-handling)
* [Development Practices](#development-practices)
* [Contributing](#contributing)

---

## 🚀 Introduction

HungryBud demonstrates a **production-grade microservices architecture** for an online food delivery platform.
Each service operates independently with its own database and can scale separately.

Currently implemented services:

* **Auth Service** – user authentication and management
* **Restaurant Service** – manages restaurants and menus
* **Order Service** – manages customer orders and order items
* **API Gateway** – central entry point for routing, authentication, and service communication

Future planned services:

* **Payment Service**
* **Delivery Service**
* **Notification Service**

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/hungrybud-backend.git
cd hungrybud-backend
```

### 2. Install dependencies

Each service has its own `package.json`.
Example for the Auth Service:

```bash
cd auth-service
npm install
```

### 3. Set up environment variables

Each service should include a `.env` file. Example:

```bash
PORT=4000
DATABASE_URL=postgresql://postgres:root@localhost:5434/hungrybud-auth
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:5173
```

### 4. Start services using Docker (recommended)

```bash
docker-compose up --build
```

---

## 🧹 Architecture Overview

HungryBud follows a **microservices architecture** with:

* **API Gateway** – handles routing, authentication, and request forwarding
* **Independent Services** – each with its own database and business logic
* **Asynchronous communication** (planned) – via message queues for scalability

**Tech Stack:**

* **Node.js** + **TypeScript**
* **Express.js**
* **PostgreSQL (Prisma ORM)**
* **Docker**
* **JWT Authentication**
* **API Gateway (express-http-proxy)**

---

## 🗂️ Project Structure

```
hungrybud-backend/
│
├── api-gateway/
│   ├── src/
│   │   ├── app.ts
│   │   ├── config/
│   │   ├── middlewares/
│   │   └── server.ts
│   └── package.json
│
├── auth-service/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── prisma/
│   │   └── middlewares/
│   └── package.json
│
├── restaurant-service/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── prisma/
│   └── package.json
│
└── order-service/
    ├── src/
    │   ├── controllers/
    │   ├── routes/
    │   ├── services/
    │   └── prisma/
    └── package.json
```

---

## 🍽️ Services Overview

### **Auth Service**

Handles:

* User registration, login, logout
* JWT-based authentication
* Refresh token management

### **Restaurant Service**

Handles:

* Restaurant registration (only by restaurant owners)
* Menu management (add/update/delete menu items)

### **Order Service**

Handles:

* Order creation
* Order item management
* Order state transitions (Placed → Confirmed → Preparing → Delivered)

---

## 🎉 API Gateway

The **API Gateway** acts as a single entry point for all client requests.
It:

* Validates JWT tokens using middleware
* Attaches user details (`x-user-id`, `x-user-type`) to requests
* Routes requests to respective services (Auth, Restaurant, Order, etc.)

Example route setup:

```ts
app.use(
  "/api/restaurants",
  authMiddleware,
  proxy(config.RESTAURANT_SERVICE_URL, {
    proxyReqPathResolver: (req) =>
      req.originalUrl.replace("/api/restaurants", "/restaurants"),
    proxyReqOptDecorator: (opts, req) => {
      const user = (req as any).user;
      if (user) {
        opts.headers["x-user-id"] = user.userId;
        opts.headers["x-user-type"] = user.userType;
      }
      return opts;
    },
  })
);
```

---

## 🧱 Middleware

### In API Gateway

* `authMiddleware` → Verifies JWT tokens and attaches `userId`, `userType`.

### In Services

* `extractUser` → Reads forwarded user headers and attaches to `req.user`.

---

## 🧠 Controllers

Example: **Order Controller**

```ts
export const createOrder = async (req: Request, res: Response) => {
  try {
    const customerId = req.userId;
    const { restaurantId, items } = req.body;

    if (!restaurantId || !Array.isArray(items) || items.length === 0)
      return res.status(400).json({ error: "Restaurant ID and items are required" });

    const order = await orderService.createOrder(customerId, restaurantId, items);
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create order" });
  }
};
```

---

## 🔐 Authentication

* **Access Tokens (JWT):** Issued during login, verified by the API Gateway.
* **Refresh Tokens (Optional Extension):** Can be used to reissue access tokens.
* User info (`userId`, `userType`) is passed via **custom headers** from gateway → downstream services.

---

## ⚡ Error Handling

Centralized error handling is applied at both service and gateway levels.
Each service sends standardized error responses with consistent JSON structure.

---

## 🦯 Development Practices & SOLID Principles

* **Single Responsibility Principle:** Each service focuses on one domain.
* **Separation of Concerns:** Authentication, restaurant, and orders are isolated.
* **Modular Design:** Controllers, routes, and services separated.
* **Transaction Safety:** Order creation and order items handled atomically using Prisma transactions.
* **Type Safety:** Built with TypeScript across all services.

---

## 🤝 Contributing

Contributions are welcome!
To contribute:

1. Fork the repo
2. Create a new branch (`feature/new-service`)
3. Commit and push your changes
4. Submit a Pull Request with a clear description

---

## 📜 License

This project is licensed under the **MIT License**.
