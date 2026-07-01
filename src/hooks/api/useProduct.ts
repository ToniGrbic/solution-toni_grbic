import { fetchProductById } from "@/api/products";
import { productKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (id: number) =>
  useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProductById(id),
    enabled: Number.isFinite(id) && id > 0,
  });
