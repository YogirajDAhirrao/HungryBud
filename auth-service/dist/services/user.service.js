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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const bcrypt_1 = require("../utils/bcrypt");
exports.userService = {
    createUser(name, email, password, userType // 👈 Optional
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate userType if provided
            const ALLOWED_USER_TYPES = [
                "CUSTOMER",
                "RESTAURANT_OWNER",
                "DELIVERY_PARTNER",
                "ADMIN",
            ];
            if (userType && !ALLOWED_USER_TYPES.includes(userType)) {
                throw new Error(`Invalid userType. Must be one of: ${ALLOWED_USER_TYPES.join(", ")}`);
            }
            const hashed = yield (0, bcrypt_1.hashpassword)(password);
            return client_1.default.user.create({
                data: {
                    name,
                    email,
                    password: hashed,
                    userType, // 👈 Undefined = "CUSTOMER" (Prisma default)
                },
            });
        });
    },
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return client_1.default.user.findUnique({
                where: { email },
                select: {
                    id: true,
                    email: true,
                    password: true, // Needed for login
                    userType: true, // 👈 Include for auth checks
                    name: true,
                },
            });
        });
    },
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return client_1.default.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    userType: true, // 👈 Include userType
                    createdAt: true,
                },
            });
        });
    },
};
