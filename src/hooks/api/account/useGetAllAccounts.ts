"use client";

import useAxios from "@/hooks/useAxios";
import { Account } from "@/types/account";
import { PageableResponse, PaginationQueries } from "@/types/search/response/PaginationResponse";
import { useQuery } from "@tanstack/react-query";

interface GetAccountsQueries extends PaginationQueries {
  search?: string;
  isVerified?: boolean;
}

const useGetAllAccounts = (queries: GetAccountsQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["get-all-accounts", queries],

    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Account>>("/accounts", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetAllAccounts;
