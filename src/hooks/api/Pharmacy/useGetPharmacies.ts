import { PaginationQueries } from "@/types/search/queries/PaginationQueries";
import { PageableResponse } from "@/types/search/response/PaginationResponse";
import { Pharmacy } from "@/types/semuaNgerapiinyaNtar";
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface PharmacyQuery extends PaginationQueries {
  search?: string;
  isOpen?: "open" | "closed" | undefined;
}
const useGetPharmacies = (queries: PharmacyQuery) => {
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
