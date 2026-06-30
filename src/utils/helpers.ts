import { SCROLL_KEY } from "@/constants";

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
};

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "USD",
  }).format(price);

export const parseOptionalNumber = (
  value: string,
): number | undefined => {
  if (!value.trim()) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export const saveScrollPosition = (): void => {
  sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
};

export const restoreScrollPosition = (): void => {
  const saved = sessionStorage.getItem(SCROLL_KEY);
  if (saved) {
    window.scrollTo(0, Number(saved));
    sessionStorage.removeItem(SCROLL_KEY);
  }
};
