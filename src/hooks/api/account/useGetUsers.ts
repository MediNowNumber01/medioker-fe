"use client";

import useAxios from "@/hooks/useAxios";
import {
  PageableResponse,
  PaginationQueries,
} from "@/types/search/response/PaginationResponse";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

interface GetUsersQueries extends PaginationQueries {
  isVerified?: boolean;
  search?: string;
  status?: string;
  provider?: string;
}

const useGetUsers = (queries?: GetUsersQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["get-all-users", queries],

    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<User>>("/accounts/users", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetUsers;
