"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const useDeletePic = () => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  const { update: updateSession } = useSession();

  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.delete(`/accounts/delete-pic`);
      return data;
    },
    onSuccess: async () => {
      toast.success("Profile picture removed successfully", {
        description: "Please login again to optimize the changes.",
      });
      await queryClient.invalidateQueries({ queryKey: ["get-account"] });
      await updateSession();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to remove picture.");
    },
  });
};

export default useDeletePic;
