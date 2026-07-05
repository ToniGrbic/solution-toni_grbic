import type { AuthUserResponse, LoginCredentials } from "@/types/auth";
import { createContext } from "react";

export type AuthContextValue = {
  user: AuthUserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
