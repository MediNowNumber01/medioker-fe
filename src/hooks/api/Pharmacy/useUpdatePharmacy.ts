"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UpdatePharmacyPayload {
  id: string;
  name: string | null;
  picture: File | null;
  detailLocation: string | null;
  lat: string | null;
  lng: string | null;
  isMain: string | null;
}

const useUpdatePharmacy = (pharmacyId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: UpdatePharmacyPayload) => {
      const formData = new FormData();
      payload.name && formData.append("name", payload.name);
      if (payload.picture) {
        formData.append("picture", payload.picture);
      }
      payload.detailLocation &&
        formData.append("detailLocation", payload.detailLocation);
      payload.lat && formData.append("lat", payload.lat);
      payload.lng && formData.append("lng", payload.lng);
      payload.isMain && formData.append("isMain", String(payload.isMain));
      const { data } = await axiosInstance.patch(
        `/pharmacies/${pharmacyId}`,
        formData
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
        queryKey: ["pharmacydetails", pharmacyId],
      });
      toast.success("Pharmacy updated successfully");
      router.push(`/superadmin/pharmacies/${pharmacyId}`);
      return true;
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useUpdatePharmacy;
