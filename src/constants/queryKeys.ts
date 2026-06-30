import type { ProductFilters } from "@/types/product";

export const productKeys = {
  all: ["products"] as const,
  list: (filters: ProductFilters) =>
    [...productKeys.all, "list", filters] as const,
  detail: (id: number) => [...productKeys.all, "detail", id] as const,
  categories: () => [...productKeys.all, "categories"] as const,
  favorites: (ids: number[]) => [...productKeys.all, "favorites", ids] as const,
};
