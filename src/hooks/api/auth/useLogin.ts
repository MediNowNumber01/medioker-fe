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
      localStorage.setItem("key", data)
      await signIn("credentials", { ...data, redirect: false });
      const lastPath = localStorage.getItem("lastPath") || "/";
      window.location.href = lastPath;
      toast.success("Login Success");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
      console.log("error", error);
      
    },
  });
};

export default useLogin;
