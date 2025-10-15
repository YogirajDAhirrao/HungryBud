import { comparePassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";
import { userService } from "./user.service";

export const authService = {
  async register(name: string, email: string, password: string) {
    const existing = await userService.getUserByEmail(email);
    if (existing) throw new Error("User already exists");

    const user = await userService.createUser(name, email, password);
    const token = generateToken(user.id);
    return { user, token };
  },
  async login(email: string, password: string) {
    const user = await userService.getUserByEmail(email);
    if (!user) throw new Error("User not found");

    const valid = await comparePassword(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const token = generateToken(user.id);
    return { user, token };
  },
};
