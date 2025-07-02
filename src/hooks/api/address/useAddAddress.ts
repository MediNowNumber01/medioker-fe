"use client";

import useAxios from "@/hooks/useAxios";
import { UserAddress } from "@/types/userAddress";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

type AddAddressPayload = Omit<UserAddress, "id" | "isPrimary"> & {
  isPrimary?: boolean;
};

const useAddAddress = () => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AddAddressPayload) => {
      const { data } = await axiosInstance.post(
        "/addresses/",
        payload
      );

      
      return data;
    },
    onSuccess: () => {
      toast.success("New address added successfully!");
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to add address.");
    },
  });
};

export default useAddAddress;
