"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const useVerifyAccount = () => {
  return useMutation({
    mutationFn: async (token: string) => {
      const { data } = await axiosInstance.post(`/auth/verify/${token}`);
      return data;
    },
  });
};

export default useVerifyAccount;
