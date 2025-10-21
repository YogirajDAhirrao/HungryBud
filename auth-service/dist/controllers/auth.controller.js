"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
// Allowed userType values (matches your schema comment)
const ALLOWED_USER_TYPES = [
    "CUSTOMER",
    "RESTAURANT_OWNER",
    "DELIVERY_PARTNER",
    "ADMIN",
];
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, userType } = req.body;
        // Validate userType (if provided)
        if (userType && !ALLOWED_USER_TYPES.includes(userType)) {
            throw new Error(`Invalid userType. Must be one of: ${ALLOWED_USER_TYPES.join(", ")}`);
        }
        // Pass userType to service (or undefined → Prisma defaults to "CUSTOMER")
        const result = yield auth_service_1.authService.register(name, email, password, userType // Optional: undefined = "CUSTOMER"
        );
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield auth_service_1.authService.login(email, password);
        res.json(result);
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
});
exports.login = login;
