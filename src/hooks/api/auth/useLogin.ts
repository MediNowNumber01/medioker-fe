"use client";

import { axiosInstance } from "@/lib/axios";
import { Account } from "@/types/account";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { date } from "yup";

const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: Pick<Account, "email" | "password">) => {
      const { data } = await axiosInstance.post("/auth/login", payload);
      return data;
    },
    onSuccess: async (data) => {
      const callbackUrl = localStorage.getItem("lastPath") || "/"; 
      
      await signIn("credentials", {
        ...data,
        callbackUrl,
        redirect: true,
      });

      toast.success("Login Success");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
      console.log("error", error);
    },
  });
};


export default useLogin;
