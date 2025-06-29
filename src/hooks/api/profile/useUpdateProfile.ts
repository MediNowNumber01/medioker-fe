"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Tipe data untuk payload yang dikirim dari form
interface UpdateProfilePayload {
  fullName: string;
  email?: string;
  profilePict?: File | null;
  password?: string;
}

const useUpdateProfile = () => {
  const router = useRouter();
  const { update: updateSession } = useSession();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const formData = new FormData();

      formData.append("fullName", payload.fullName);

      if (payload.email) {
        formData.append("email", payload.email);
      }
      if (payload.profilePict) {
        formData.append("profilePict", payload.profilePict);
      }
      if (payload.password) {
        formData.append("password", payload.password);
      }

      const { data } = await axiosInstance.patch("/accounts/", formData);
      return data;
    },
    onSuccess: async (data) => {
      toast.success(
        "Profile updated successfully, please relogin to see the changes."
      );
      await queryClient.invalidateQueries({ queryKey: ["get-account"] });
      await updateSession(data);

      router.push("/profile");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    },
  });
};

export default useUpdateProfile;
