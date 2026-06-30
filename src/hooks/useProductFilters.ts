import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import type { ProductFilters, ProductViewMode } from "@/types/product";

const DEFAULT_FILTERS: ProductFilters = {
  search: "",
  category: "",
  minPrice: "",
  maxPrice: "",
  page: 1,
  view: "grid",
};

const parsePage = (value: string | null): number => {
  const page = Number(value);
  return Number.isFinite(page) && page > 0 ? page : 1;
};

const parseView = (value: string | null): ProductViewMode =>
  value === "table" ? "table" : "grid";

export const useProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo<ProductFilters>(
    () => ({
      search: searchParams.get("search") ?? DEFAULT_FILTERS.search,
      category: searchParams.get("category") ?? DEFAULT_FILTERS.category,
      minPrice: searchParams.get("minPrice") ?? DEFAULT_FILTERS.minPrice,
      maxPrice: searchParams.get("maxPrice") ?? DEFAULT_FILTERS.maxPrice,
      page: parsePage(searchParams.get("page")),
      view: parseView(searchParams.get("view")),
    }),
    [searchParams],
  );

  const setFilters = useCallback(
    (updates: Partial<ProductFilters>) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);

          const apply = (key: keyof ProductFilters, value: string | number) => {
            const stringValue = String(value);
            const defaultValue = DEFAULT_FILTERS[key];
            if (
              stringValue === String(defaultValue) ||
              stringValue === "" ||
              (key === "page" && value === 1)
            ) {
              next.delete(key);
            } else {
              next.set(key, stringValue);
            }
          };

          Object.entries(updates).forEach(([key, value]) => {
            if (value !== undefined) {
              apply(key as keyof ProductFilters, value);
            }
          });

          if (!("page" in updates) && Object.keys(updates).some((k) => k !== "view")) {
            next.delete("page");
          }

          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  return { filters, setFilters };
};
