export type ProductCategory = {
  slug: string;
  name: string;
  url: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductViewMode = "grid" | "table";

export type ProductFilters = {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  page: number;
  view: ProductViewMode;
};
