import { THEME_KEY } from "@/constants";
import { Theme } from "@/types/enums";

export const getStoredTheme = (): Theme | null => {
  const stored = localStorage.getItem(THEME_KEY);
  return stored === Theme.DARK || stored === Theme.LIGHT ? stored : null;
};

export const applyTheme = (theme: Theme): void => {
  if (theme === Theme.DARK) {
    document.documentElement.setAttribute("data-theme", Theme.DARK);
  } else {
    document.documentElement.removeAttribute("data-theme");
  }

  localStorage.setItem(THEME_KEY, theme);
};

export const getPreferredTheme = (): Theme => getStoredTheme() ?? Theme.LIGHT;

export const initTheme = (): Theme => {
  const theme = getPreferredTheme();
  applyTheme(theme);
  return theme;
};

export const toggleTheme = (current: Theme): Theme => {
  const next = current === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
  applyTheme(next);
  return next;
};
