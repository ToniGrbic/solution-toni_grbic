import { fetchProductById } from "@/api/products";
import { productKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export const useFavoriteProducts = (ids: number[]) =>
  useQuery({
    queryKey: productKeys.favorites(ids),
    queryFn: async () => {
      const products = await Promise.all(ids.map((id) => fetchProductById(id)));
      return products;
    },
    enabled: ids.length > 0,
  });
