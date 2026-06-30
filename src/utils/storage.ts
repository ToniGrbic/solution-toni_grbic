import { FAVORITES_KEY, TOKEN_KEY, USER_KEY } from "@/constants/storageKeys";
import type { AuthUserResponse } from "@/types/auth";

export const getStoredToken = (): string | null =>
  localStorage.getItem(TOKEN_KEY);

export const getStoredUser = (): string | null => localStorage.getItem(USER_KEY);

export const setAuthStorage = (user: AuthUserResponse): void => {

  const { accessToken, refreshToken, ...userData } = user;
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
};

export const clearAuthStorage = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getFavorites = (): number[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? (JSON.parse(stored) as number[]) : [];
  } catch {
    return [];
  }
};

export const setFavorites = (ids: number[]): void => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
};

export const toggleFavorite = (id: number): number[] => {
  const current = getFavorites();
  const next = current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id];
  setFavorites(next);
  return next;
};

export const isFavorite = (id: number): boolean =>
  getFavorites().includes(id);
