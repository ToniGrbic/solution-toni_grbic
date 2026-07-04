import type {
  AuthUserResponse,
  LoginCredentials,
  LoginResponse,
} from "@/types/auth";
import api from "./base";

export const login = async (
  credentials: LoginCredentials,
): Promise<AuthUserResponse> => {
  return api.post<never, AuthUserResponse>("/auth/login", credentials);
};

export const getMe = async (): Promise<LoginResponse> => {
  return api.get<never, LoginResponse>("/auth/me");
};
