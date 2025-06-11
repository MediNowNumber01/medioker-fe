import { ProductQueries } from "@/app/types/search/queries/ProductQueries";
import { PageableResponse } from "@/app/types/search/response/PaginationResponse";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../useAxios";
import { Product } from "@/app/types/semuaNgerapiinyaNtar";

const useGetProducts = (queries: ProductQueries) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["products", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Product>>(
        "/products",
        { params: queries }
      );
      return data;
    },
  });
};

export default useGetProducts;
