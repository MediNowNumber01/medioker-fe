import { PaginationQueries } from "@/types/search/queries/PaginationQueries";
import { PageableResponse } from "@/types/search/response/PaginationResponse";
import { Pharmacy, Product } from "@/types/semuaNgerapiinyaNtar";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../useAxios";

interface PharmacyQuery extends PaginationQueries {
  search?: string;
  isOpen?: "open" | "closed" | undefined;
}
const useGetEmployee = (queries: PharmacyQuery) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["pharmacies", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Pharmacy>>(
        "/pharmacies",
        { params: queries }
      );
      return data;
    },
  });
};

export default useGetEmployee;
