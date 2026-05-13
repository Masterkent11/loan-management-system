import { Role } from "@prisma/client";
import { prisma } from "../database/prisma.client.js";
import type {
  LoginInput,
  RegisterInput,
} from "../validators/auth.validator.js";
import { HttpError } from "../utils/http-error.js";
import { hashPassword, verifyPassword } from "../utils/password.util.js";
import { signAccessToken } from "../utils/token.util.js";

const toSafeUser = (user: {
  id: string;
  name: string;
  email: string;
  role: Role;
}) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export const authService = {
  async register(input: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser) {
      throw new HttpError(409, "Email is already registered.");
    }

    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: await hashPassword(input.password),
        role: Role.USER,
      },
    });

    const token = signAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { user: toSafeUser(user), token };
  },

  async login(input: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user || !(await verifyPassword(input.password, user.password))) {
      throw new HttpError(401, "Invalid email or password.");
    }

    const token = signAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { user: toSafeUser(user), token };
  },

  async me(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      throw new HttpError(404, "User not found.");
    }

    return user;
  },
};
