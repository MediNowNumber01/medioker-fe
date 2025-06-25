"use client";

import { useQuery } from "@tanstack/react-query";
import { Account } from "@/types/account";
import {
  PageableResponse,
  PaginationQueries,
} from "@/types/search/response/PaginationResponse";
import useAxios from "@/hooks/useAxios";
import axios from "axios";

interface GetAdminsQueries extends PaginationQueries {
  search?: string;
  isVerified?: boolean;
}

const useGetAllAdmins = (queries?: GetAdminsQueries) => {
  return useQuery<PageableResponse<Account>>({
    queryKey: ["get-all-admins", queries],
    queryFn: async () => {
      const { data } = await axios.get("/accounts/admins", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetAllAdmins;
