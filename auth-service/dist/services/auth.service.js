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
exports.authService = void 0;
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
const user_service_1 = require("./user.service");
exports.authService = {
    register(name_1, email_1, password_1) {
        return __awaiter(this, arguments, void 0, function* (name, email, password, userType = "CUSTOMER") {
            const existing = yield user_service_1.userService.getUserByEmail(email);
            if (existing)
                throw new Error("User already exists");
            const user = yield user_service_1.userService.createUser(name, email, password, userType); // 👈 Pass userType
            const token = (0, jwt_1.generateToken)(user.id, user.userType);
            return {
                user: { id: user.id, email: user.email, userType: user.userType },
                token,
            }; // 👈 Include userType
        });
    },
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.userService.getUserByEmail(email);
            if (!user)
                throw new Error("User not found");
            const valid = yield (0, bcrypt_1.comparePassword)(password, user.password);
            if (!valid)
                throw new Error("Invalid credentials");
            const token = (0, jwt_1.generateToken)(user.id, user.userType);
            return {
                user: { id: user.id, email: user.email, userType: user.userType },
                token,
            }; // 👈 Include userType
        });
    },
};
