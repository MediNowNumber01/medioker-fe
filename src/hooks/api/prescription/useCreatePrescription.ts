"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreatePrescriptionPayload {
  prescriptionImages: File[];
  notes: string;
  deliveryMethod: "delivery" | "pickup";
  pharmacyId: string;
  addressId?: string;
}

const useCreatePrescription = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreatePrescriptionPayload) => {
      const formData = new FormData();

      formData.append("note", payload.notes);
      formData.append(
        "orderType",
        payload.deliveryMethod === "delivery" ? "DELIVERY" : "PICKUP"
      );
      formData.append("pharmacyId", payload.pharmacyId);
            if (payload.deliveryMethod === "delivery" && payload.addressId) {
        formData.append("userAddressId", payload.addressId);
      }
      payload.prescriptionImages.forEach((file) => {
        formData.append("prescriptions", file);
      });

      const { data } = await axiosInstance.post("/prescriptions", formData);
      return data;
    },
    onSuccess: (response) => {
      toast.success(
        response.message || "Prescription order created successfully!"
      );
      // Redirect setelah sukses
      router.push(`/orders/${response.data.id}`); 
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      console.error("Error creating prescription:", error.response?.data);
      toast.error(errorMessage);
    },
  });
};

export default useCreatePrescription;