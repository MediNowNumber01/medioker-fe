"use client";

import { axiosInstance } from "@/lib/axios";
import { Account } from "@/types/account";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getSession, useSession } from "next-auth/react";
import { toast } from "sonner";

const useForgotPassword = () => {
    
  return useMutation({
    mutationFn: async (payload: Pick<Account, "email">) => {
      const { data } = await axiosInstance.post(
        "/auth/forgot-password",
        payload,
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Send email success, please check your email");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useForgotPassword;
