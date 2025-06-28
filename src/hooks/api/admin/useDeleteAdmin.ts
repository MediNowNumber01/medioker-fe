"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useDeleteAdmin = () => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (adminId: string) => {
      const { data } = await axiosInstance.delete(`/admins/${adminId}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Admin account deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message || "Failed to delete admin account."
      );
    },
  });
};

export default useDeleteAdmin;
