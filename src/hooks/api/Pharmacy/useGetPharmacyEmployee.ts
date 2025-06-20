import { PaginationQueries } from "@/types/search/queries/PaginationQueries";
import { PageableResponse } from "@/types/search/response/PaginationResponse";
import { Admin, Pharmacy } from "@/types/semuaNgerapiinyaNtar";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../useAxios";

interface PharmacyEmployeeQueries extends PaginationQueries {
  search?: string;
}
const useGetPharmacyEmployee = (
  pharmacyId: string,
  queries: PharmacyEmployeeQueries
) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["pharmacyEmployee", pharmacyId, queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Admin>>(
        `/pharmacies/employee/${pharmacyId}`,
        { params: { ...queries } }
      );
      return data;
    },
  });
};

export default useGetPharmacyEmployee;
