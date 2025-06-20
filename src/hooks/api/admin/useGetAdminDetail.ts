import { PageableResponse } from "@/types/search/response/PaginationResponse";
import { Admin } from "@/types/semuaNgerapiinyaNtar";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../useAxios";

const useGetAdmin = (adminId: string) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["admindetail", adminId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Admin>>(
        `/admins/${adminId}`
      );
      return data;
    },
  });
};

export default useGetAdmin;
