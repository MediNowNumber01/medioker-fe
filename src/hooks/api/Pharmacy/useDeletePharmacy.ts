"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useDeletePharmacy = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (pharmacyId: string) => {
      const { data } = await axiosInstance.delete(`/pharmacies/${pharmacyId}`);
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["dashboardpharmacy"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["pharmacies"],
        exact: false,
        refetchType: "all",
        type: "all",
      });
      toast.success("Pharmacy deleted successfully");
      router.push("/superadmin/pharmacies");
      return true;
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useDeletePharmacy;
