import prisma from "../prisma/client";
import { hashpassword } from "../utils/bcrypt";

export const userService = {
  async createUser(
    name: string,
    email: string,
    password: string,
    userType?: string // 👈 Optional
  ) {
    // Validate userType if provided
    const ALLOWED_USER_TYPES = [
      "CUSTOMER",
      "RESTAURANT_OWNER",
      "DELIVERY_PARTNER",
      "ADMIN",
    ];
    if (userType && !ALLOWED_USER_TYPES.includes(userType)) {
      throw new Error(
        `Invalid userType. Must be one of: ${ALLOWED_USER_TYPES.join(", ")}`
      );
    }

    const hashed = await hashpassword(password);
    return prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        userType, // 👈 Undefined = "CUSTOMER" (Prisma default)
      },
    });
  },

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true, // Needed for login
        userType: true, // 👈 Include for auth checks
        name: true,
      },
    });
  },

  async getAllUsers() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        userType: true, // 👈 Include userType
        createdAt: true,
      },
    });
  },
};
