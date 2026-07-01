import { FAVORITES_KEY } from "@/constants";
import { isFavorite, toggleFavorite as toggleStored } from "@/utils/storage";
import { useCallback, useSyncExternalStore } from "react";
import toast from "react-hot-toast";

const EMPTY_FAVORITES: number[] = [];

let cachedRaw: string | null = null;
let cachedSnapshot: number[] = EMPTY_FAVORITES;

const readSnapshot = (): number[] => {
  const raw = localStorage.getItem(FAVORITES_KEY) ?? "[]";

  if (raw === cachedRaw) {
    return cachedSnapshot;
  }

  cachedRaw = raw;

  try {
    const parsed = JSON.parse(raw) as number[];
    cachedSnapshot = parsed.length > 0 ? parsed : EMPTY_FAVORITES;
  } catch {
    cachedSnapshot = EMPTY_FAVORITES;
  }

  return cachedSnapshot;
};

const invalidateSnapshot = (): void => {
  cachedRaw = null;
};

const listeners = new Set<() => void>();

const subscribe = (callback: () => void) => {
  listeners.add(callback);

  const onStorage = (event: StorageEvent) => {
    if (event.key === FAVORITES_KEY || event.key === null) {
      invalidateSnapshot();
      callback();
    }
  };

  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
};

const notify = (id: number): void => {
  invalidateSnapshot();
  listeners.forEach((listener) => listener());

  if (isFavorite(id)) {
    toast.success("Proizvod dodan u favorite");
  } else {
    toast.success("Proizvod uklonjen iz favorita");
  }
};

export const useFavorites = () => {
  const favorites = useSyncExternalStore(subscribe, readSnapshot, readSnapshot);

  const toggleFavorite = useCallback((id: number) => {
    toggleStored(id);
    notify(id);
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.includes(id),
    [favorites],
  );

  return { favorites, toggleFavorite, isFavorite };
};
