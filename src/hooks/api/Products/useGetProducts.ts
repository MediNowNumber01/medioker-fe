import { ProductQueries } from "@/types/search/queries/ProductQueries";
import { PageableResponse } from "@/types/search/response/PaginationResponse";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../useAxios";
import { Pharmacy, Product } from "@/types/semuaNgerapiinyaNtar";

const useGetProducts = (queries: ProductQueries) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["products", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        { pharmacy: Pharmacy } & PageableResponse<Product>
      >("/products", { params: queries });
      return data;
    },
  });
};

export default useGetProducts;
