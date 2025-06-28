import { Admin } from "@/types/admin";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../useAxios";

const useGetAdmin = (adminId: string) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["admindetail", adminId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/admins/${adminId}`
      );
      return data.data;
    },
  });
};

export default useGetAdmin;
