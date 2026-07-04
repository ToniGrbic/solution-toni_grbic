import { getMe, login as loginRequest } from "@/api/auth";
import type { AuthUserResponse, LoginCredentials, LoginResponse } from "@/types/auth";
import {
  clearAuthStorage,
  getStoredToken,
  setAuthStorage,
  updateStoredUser,
} from "@/utils/storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AuthContextValue = {
  user: AuthUserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const toAuthUser = (
  user: LoginResponse,
  accessToken: string,
): AuthUserResponse => ({
  ...user,
  accessToken,
  refreshToken: "",
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(getStoredToken()));

  useEffect(() => {
    const validateSession = async () => {
      const token = getStoredToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const me = await getMe();
        updateStoredUser(me);
        setUser(toAuthUser(me, token));
      } catch {
        clearAuthStorage();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    void validateSession();
  }, []);

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
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout],
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
