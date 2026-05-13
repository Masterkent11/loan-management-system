import { httpClient } from "../../../services/http-client";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../types/auth.types";

export const authApi = {
  async login(payload: LoginPayload) {
    const { data } = await httpClient.post<AuthResponse>(
      "/auth/login",
      payload,
    );
    return data;
  },

  async register(payload: RegisterPayload) {
    const { data } = await httpClient.post<AuthResponse>(
      "/auth/register",
      payload,
    );
    return data;
  },
};
