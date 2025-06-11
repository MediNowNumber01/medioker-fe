"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  profilePict?: File | null; 
}

const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const registerForm = new FormData();

      registerForm.append("fullName", payload.fullName);
      registerForm.append("email", payload.email);
      registerForm.append("password", payload.password);

      if (payload.profilePict) {
        registerForm.append("profilePict", payload.profilePict);
      }

      const { data } = await axiosInstance.post(
        "/auth/register",
        registerForm
      );

      return data;
    },
    onSuccess: () => {
      toast.success("Registration successful!", {
        description: "Please check your email to verify your account.",
      });
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "An unexpected error occurred.");
    },
  });
};

export default useRegister;