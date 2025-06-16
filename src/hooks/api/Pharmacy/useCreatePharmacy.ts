"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreatePharmacyPayload {
  name: string;
  description: string;
  picture: File | null;
  detailLocation: string;
  lat: string;
  lng: string;
  isMain: string;
}

const useCreatePharmacy = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: CreatePharmacyPayload) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("description", payload.description);
      if (payload.picture) {
        formData.append("picture", payload.picture);
      }
      formData.append("detailLocation", payload.detailLocation);
      formData.append("lat", payload.lat);
      formData.append("lng", payload.lng);
      formData.append("isMain", String(payload.isMain));
      const { data } = await axiosInstance.post(`/pharmacies`, formData);
      return data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["pharmacies", "dashboard_pharmacy"],
      });
      toast.success("Pharmacy created successfully");
      router.push("/superadmin/pharmacies");
      return true;
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useCreatePharmacy;
