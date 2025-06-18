import useAxios from "@/hooks/useAxios";
import { Pharmacy } from "@/types/semuaNgerapiinyaNtar";
import { useQuery } from "@tanstack/react-query";

interface GetDetailPharmacyResponse {
  data: Pharmacy;
  message: string;
}
export const useGetDetailPharmacy = (id: string) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["pharmacyDetails", id],
    queryFn: async () => {
      const response = await axiosInstance.get<GetDetailPharmacyResponse>(
        `/pharmacies/${id}`
      );
      if (response.status !== 200) {
        throw new Error(
          `Error fetching pharmacy details: ${response.statusText}`
        );
      }
      return response.data;
    },
  });
};
