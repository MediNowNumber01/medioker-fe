"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const useResendVerification = () => {
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post("/auth/resend-verification");
      return data;
    },
    onSuccess: () => {
      toast.success("Verification email sent!", {
        description: "Please check your inbox for the verification link.",
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to send email.");
    },
  });
};

export default useResendVerification;
