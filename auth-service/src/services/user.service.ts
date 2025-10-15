import { prisma } from "../prisma/client";
import { hashpassword } from "../utils/bcrypt";

export const userService = {
  async createUser(name: string, email: string, password: string) {
    const hashed = await hashpassword(password);
    return prisma.user.create({
      data: { name, email, password: hashed },
    });
  },

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  async getAllUser() {
    return prisma.user.findMany({
      select: { id: true, name: true, email: true, createdAt: true },
    });
  },
};
