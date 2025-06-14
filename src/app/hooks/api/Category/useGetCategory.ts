import { PageableResponse } from "@/app/types/search/response/PaginationResponse";
import { Category } from "@/app/types/semuaNgerapiinyaNtar";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../useAxios";

const useGetCategory = (id: string) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{ data: Category }>(
        `/categories/${id}`
      );
      return data;
    },
  });
};

export default useGetCategory;
