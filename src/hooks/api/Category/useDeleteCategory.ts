"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete(`/categories/${id}`);
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success("Category deleted successfully");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useDeleteCategory;
