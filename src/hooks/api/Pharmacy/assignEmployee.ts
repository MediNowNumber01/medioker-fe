"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface assignEmployeePayload {
  adminId: string[];
}

const useAssignEmployee = (pharmacyId: string) => {
  const queryClient = useQueryClient();

  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: assignEmployeePayload) => {
      const { data } = await axiosInstance.post(`/pharmacies/employee`, {
        pharmacyId: pharmacyId,
        adminId: payload.adminId,
      });
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
      toast.success("admin successfully assigned to pharmacy");
      return true;
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useAssignEmployee;
