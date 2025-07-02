import { ProductQueries } from "@/types/search/queries/ProductQueries";
import { PageableResponse } from "@/types/search/response/PaginationResponse";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import useAxios from "../../useAxios";
import { Pharmacy, Product } from "@/types/semuaNgerapiinyaNtar";

type ProductResponse = { pharmacy: Pharmacy } & PageableResponse<Product>;

type ProductQueryOptions = Omit<
  UseQueryOptions<ProductResponse>,
  "queryKey" | "queryFn"
>;

const useGetProducts = (
  queries: ProductQueries,

  options?: ProductQueryOptions
) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["products", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ProductResponse>("/products", {
        params: queries,
      });
      return data;
    },

    ...options,
  });
};

export default useGetProducts;
