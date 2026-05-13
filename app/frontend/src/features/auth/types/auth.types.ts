import type { CurrentUser } from "@loan-management/shared";

export type AuthResponse = {
  user: CurrentUser;
  token: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  name: string;
};
