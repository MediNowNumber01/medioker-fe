import { PaginationQueries } from "@/types/search/queries/PaginationQueries";
import { PageableResponse } from "@/types/search/response/PaginationResponse";
import {
  Admin,
  AdminRole,
  Pharmacy,
  Product,
} from "@/types/semuaNgerapiinyaNtar";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../useAxios";

interface GetAdminQuery extends PaginationQueries {
  search?: string;
  role?: AdminRole;
  status?: string;
  notOnPharmacy?: string;
}
const useGetAdmins = (queries: GetAdminQuery) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["admin", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Admin>>(
        "/admins",
        { params: queries }
      );
      return data;
    },
  });
};

export default useGetAdmins;
