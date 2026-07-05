import type { Theme } from "@/types/enums";
import {
  applyTheme,
  getPreferredTheme,
  toggleTheme as toggleThemeUtil,
} from "@/utils/theme";
import { useCallback, useMemo, useState, type ReactNode } from "react";
import { ThemeContext } from "./themeContext";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(() => getPreferredTheme());

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => toggleThemeUtil(current));
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
