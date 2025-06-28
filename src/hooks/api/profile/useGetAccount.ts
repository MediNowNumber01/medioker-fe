"use client";

import useAxios from "@/hooks/useAxios";
import { Account } from "@/types/account";
import { useQuery } from "@tanstack/react-query";

const useGetAccount = () => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["get-account"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Account>(`/accounts/user`);
      console.log(data);
      
      return data;
    },
  });
};

export default useGetAccount;
