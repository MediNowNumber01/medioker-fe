"use client";

import useAxios from "@/hooks/useAxios";
import { Account } from "@/types/account";
import { useQuery } from "@tanstack/react-query";

const useGetAccountById = (accountId: string) => {
  const { axiosInstance } = useAxios();

  return useQuery<Account>({
    queryKey: ["get-account-by-id", accountId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/accounts/${accountId}`);
      return data.data;
    },
    enabled: !!accountId,
  });
};

export default useGetAccountById;
