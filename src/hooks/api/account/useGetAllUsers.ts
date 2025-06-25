"use client";

import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { Account } from "@/types/account";
import {
  PageableResponse,
  PaginationQueries,
} from "@/types/search/response/PaginationResponse";

interface GetUsersQueries extends PaginationQueries {
  isVerified?: boolean;
  search?: string;
}

const useGetAllUsers = (queries?: GetUsersQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery<PageableResponse<Account>>({
    queryKey: ["get-all-users", queries],

    queryFn: async () => {
      const { data } = await axiosInstance.get("/accounts/users", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetAllUsers;
