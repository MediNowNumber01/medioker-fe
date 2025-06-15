import { PageableResponse } from "@/app/types/search/response/PaginationResponse";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../useAxios";
import { Category } from "@/app/types/semuaNgerapiinyaNtar";
import { CategoryQueries } from "@/app/types/search/queries/CategoryQueries";

const useGetCategories = (queries: CategoryQueries) => {
  const { axiosInstance } = useAxios();
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
