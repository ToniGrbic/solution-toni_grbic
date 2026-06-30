import {
  fetchCategories,
  fetchProductById,
  fetchProducts,
  fetchProductsByCategory,
  PAGE_SIZE,
  searchProducts,
} from "@/api/products";
import { productKeys } from "@/constants/queryKeys";
import type { Product, ProductFilters } from "@/types/product";
import { parseOptionalNumber } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";

const filterByPriceRange = (
  products: Product[],
  minPrice?: number,
  maxPrice?: number,
): Product[] => {
  return products.filter((product) => {
    if (minPrice !== undefined && product.price < minPrice) return false;
    if (maxPrice !== undefined && product.price > maxPrice) return false;
    return true;
  });
};

const fetchFilteredProducts = async (filters: ProductFilters) => {
  const skip = (filters.page - 1) * PAGE_SIZE;
  const minPrice = parseOptionalNumber(filters.minPrice);
  const maxPrice = parseOptionalNumber(filters.maxPrice);
  const hasPriceFilter = minPrice !== undefined || maxPrice !== undefined;

  let response;

  if (filters.search.trim()) {
    response = await searchProducts(filters.search.trim(), 0, 100);
  } else if (filters.category) {
    response = await fetchProductsByCategory(filters.category, 0, 100);
  } else {
    response = await fetchProducts(skip, PAGE_SIZE);
  }

  if (filters.search.trim() || filters.category || hasPriceFilter) {
    let products = response.products;

    if (filters.category && filters.search.trim()) {
      products = products.filter(
        (p) => p.category.toLowerCase() === filters.category.toLowerCase(),
      );
    }

    if (hasPriceFilter) {
      products = filterByPriceRange(products, minPrice, maxPrice);
    }

    const total = products.length;
    const paginated = products.slice(skip, skip + PAGE_SIZE);

    return { products: paginated, total, skip, limit: PAGE_SIZE };
  }

  return response;
};

export const useProducts = (filters: ProductFilters) =>
  useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => fetchFilteredProducts(filters),
    placeholderData: (previous) => previous,
    staleTime: 1000 * 60 * 10,
  });

export const useProduct = (id: number) =>
  useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProductById(id),
    enabled: Number.isFinite(id) && id > 0,
  });

export const useCategories = () =>
  useQuery({
    queryKey: productKeys.categories(),
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10,
  });

export const useFavoriteProducts = (ids: number[]) =>
  useQuery({
    queryKey: productKeys.favorites(ids),
    queryFn: async () => {
      const products = await Promise.all(ids.map((id) => fetchProductById(id)));
      return products;
    },
    enabled: ids.length > 0,
  });
