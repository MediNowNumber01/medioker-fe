"use client";

import { signOut } from "@/lib/auth";
import { axiosInstance } from "@/lib/axios";
import { Account } from "@/types/account";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useResetPassword = (token: string) => {
  const session = useSession();
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: Pick<Account, "password">) => {
      const { data } = await axiosInstance.patch(
        "/auth/reset-password",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Reset password success");
      if(session.status === "authenticated"){
        signOut()
      }
      router.push("/login")
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useResetPassword;
