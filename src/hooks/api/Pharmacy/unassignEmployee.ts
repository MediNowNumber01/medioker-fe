"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useUnassignEmployee = () => {
  const queryClient = useQueryClient();

  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: { adminId: string }) => {
      const { data } = await axiosInstance.delete(
        `/pharmacies/employee/${payload.adminId}`
      );
      return data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["dashboardpharmacy"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["pharmacies"],
        exact: false,
        refetchType: "all",
        type: "all",
      });
      await queryClient.invalidateQueries({
        queryKey: ["admindetail"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["pharmacyEmployee"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["pharmacydetails"],
      });
      toast.success(
        data.message || "admin successfully unassigned from pharmacy"
      );
      return true;
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useUnassignEmployee;
