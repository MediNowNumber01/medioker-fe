"use client";

import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const useVerifyResetToken = (token: string) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["verify-reset-token", token],

    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/auth/verify-reset-token/${token}`
      );
      return data;
    },

    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!token,
  });
};

export default useVerifyResetToken;
