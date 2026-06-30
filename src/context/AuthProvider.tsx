import { login as loginRequest } from "@/api/auth";
import type { AuthUserResponse, LoginCredentials } from "@/types/auth";
import {
  clearAuthStorage,
  getStoredToken,
  getStoredUser,
  setAuthStorage,
} from "@/utils/storage";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AuthContextValue = {
  user: AuthUserResponse | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const readStoredUser = (): AuthUserResponse | null => {
  const raw = getStoredUser();
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUserResponse;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUserResponse | null>(() => {
    const token = getStoredToken();
    if (!token) return null;
    return readStoredUser();
  });

  const login = useCallback(async (credentials: LoginCredentials) => {
    const response = await loginRequest(credentials);
    setAuthStorage(response);
    setUser(response);
  }, []);

  const logout = useCallback(() => {
    clearAuthStorage();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user && getStoredToken()),
      login,
      logout,
    }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
