import { useQuery } from "@tanstack/react-query";
import useAxios from "../../useAxios";

interface GetDashboardPharmacyResponse {
  data: {
    totalPharmacies: number;
    openPharmacies: number;
    closedPharmacies: number;
    totalAdmins: number;
    assignedAdmin: number;
    unassignedAdmin: number;
  };
  message: string;
}

const useGetDashboardPharmacy = () => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["dashboardpharmacy"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetDashboardPharmacyResponse>(
        "/pharmacies/dashboard"
      );
      return data;
    },
  });
};

export default useGetDashboardPharmacy;
