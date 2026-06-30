import type {
  Product,
  ProductCategory,
  ProductsResponse,
} from "@/types/product";
import api from "./base";
import { PAGE_SIZE } from "@/constants";

export const fetchProducts = async (
  skip: number,
  limit: number = PAGE_SIZE,
): Promise<ProductsResponse> => {
  return api.get<never, ProductsResponse>("/products", {
    params: { skip, limit },
  });
};

export const searchProducts = async (
  query: string,
  skip: number,
  limit: number = PAGE_SIZE,
) => {
  return api.get<never, ProductsResponse>("/products/search", {
    params: { q: query, skip, limit },
  });
};

export const fetchProductsByCategory = async (
  category: string,
  skip: number,
  limit: number = PAGE_SIZE,
) => {
  return api.get<never, ProductsResponse>(
    `/products/category/${encodeURIComponent(category)}`,
    { params: { skip, limit } },
  );
};

export const fetchProductById = async (id: number): Promise<Product> => {
  return api.get<never, Product>(`/products/${id}`);
};

export const fetchCategories = async (): Promise<ProductCategory[]> => {
  return api.get<never, ProductCategory[]>("/products/categories");
};
