import { PaginationQueries } from "@/app/types/search/queries/PaginationQueries";
import { PageableResponse } from "@/app/types/search/response/PaginationResponse";
import { Pharmacy, Product } from "@/app/types/semuaNgerapiinyaNtar";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../useAxios";

interface PharmacyQuery extends PaginationQueries {
  search?: string;
}
const useGetPharmacies = (queries: PharmacyQuery) => {
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

export default useGetPharmacies;
