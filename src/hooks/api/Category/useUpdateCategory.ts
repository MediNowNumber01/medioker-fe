"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: {
      id: string;
      name: string;
      description: string;
    }) => {
      const { id, ...updateData } = payload;
      const { data } = await axiosInstance.patch(
        `/categories/${id}`,
        updateData
      );
      return data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success("Category updated successfully");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useUpdateCategory;
