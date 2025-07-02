"use client";

import { axiosInstance } from "@/lib/axios";
import { Account } from "@/types/account";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import { toast } from "sonner";
import { date } from "yup";

const useLogin = () => {
  const router = useRouter();
  const [callbackUrl] = useQueryState(
    "callbackUrl",
    parseAsString.withDefault("")
  );
  return useMutation({
    mutationFn: async (payload: Pick<Account, "email" | "password">) => {
      const { data } = await axiosInstance.post("/auth/login", payload);
      return data;
    },
    onSuccess: async (data) => {
      await signIn("credentials", {
        ...data,
        callbackUrl,
        redirect: true,
      });

      toast.success("Login Success");
      router.push(callbackUrl);
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useLogin;
