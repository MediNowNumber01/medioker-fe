"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useUpdatePrimaryAddress = () => {
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (addressId: string) => {
      const { data } = await axiosInstance.patch(`/addresses/set-primary/${addressId}`);
      return data;
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to update address.");
    },
  });
};

export default useUpdatePrimaryAddress;