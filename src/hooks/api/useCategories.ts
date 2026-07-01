import { fetchCategories } from "@/api/products";
import { productKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () =>
  useQuery({
    queryKey: productKeys.categories(),
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10,
  });
