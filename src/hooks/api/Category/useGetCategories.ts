import { axiosInstance } from "@/lib/axios";
import { CategoryQueries } from "@/types/search/queries/CategoryQueries";
import { PageableResponse } from "@/types/search/response/PaginationResponse";
import { Category } from "@/types/semuaNgerapiinyaNtar";
import { useQuery } from "@tanstack/react-query";

const useGetCategories = (queries: CategoryQueries) => {
  return useQuery({
    queryKey: ["categories", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Category>>(
        "/categories",
        { params: queries }
      );
      return data;
    },
  });
};

export default useGetCategories;
