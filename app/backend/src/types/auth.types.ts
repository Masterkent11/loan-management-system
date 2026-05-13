import type { Request } from "express";
import type { Role } from "@prisma/client";

export type AuthUser = {
  id: string;
  email: string;
  role: Role;
};

export type AuthenticatedRequest = Request & {
  user: AuthUser;
};
