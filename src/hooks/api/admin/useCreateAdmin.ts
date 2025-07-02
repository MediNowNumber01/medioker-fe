"use client";

import useAxios from "@/hooks/useAxios";
import { AdminRole } from "@/types/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateAdminPayload {
  fullName: string;
  email: string;
  password: string;
  adminRole: AdminRole;
  profilePict: File;
}

const useCreateAdmin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateAdminPayload) => {
      const formData = new FormData();

      formData.append("fullName", payload.fullName);
      formData.append("email", payload.email);
      formData.append("password", payload.password);
      formData.append("adminRole", payload.adminRole);
      formData.append("profilePict", payload.profilePict);

      const { data } = await axiosInstance.post("/admins", formData);
      return data;
    },
    onSuccess: () => {
      toast.success("Admin account created successfully!");
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      router.push("/superadmin/accounts/admins");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to create admin.");
    },
  });
};

export default useCreateAdmin;
