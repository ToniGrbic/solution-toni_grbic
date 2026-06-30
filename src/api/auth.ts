import type { AuthUserResponse, LoginCredentials } from "@/types/auth";
import api from "./base";

export const login = async (
  credentials: LoginCredentials,
): Promise<AuthUserResponse> => {
  return api.post<never, AuthUserResponse>("/auth/login", credentials);
};
