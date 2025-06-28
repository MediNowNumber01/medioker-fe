"use client";

import useAxios from "@/hooks/useAxios";
import { AdminRole } from "@/types/admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UpdateAdminPayload {
  fullName: string;
  adminRole: AdminRole;
  profilePict?: File | null;
}

const useUpdateAdmin = (accountId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: UpdateAdminPayload) => {
      const formData = new FormData();
      formData.append('fullName', payload.fullName);
      formData.append('adminRole', payload.adminRole);
      if (payload.profilePict) {
        formData.append('profilePict', payload.profilePict);
      }
      
      // Menggunakan metode PATCH ke endpoint spesifik untuk update admin
      const { data } = await axiosInstance.patch(`/admins/${accountId}`, formData);
      return data;
    },
    onSuccess: () => {
      toast.success("Admin account updated successfully!");
      // Invalidate query untuk me-refresh data di halaman daftar admin
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      // Kembali ke halaman daftar admin
      router.push('/superadmin/accounts/admins');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to update admin account.");
    },
  });
};

export default useUpdateAdmin;