"use client";

import useAxios from "@/hooks/useAxios";
import { Pharmacy } from "@/types/pharmacy";
import { useQuery } from "@tanstack/react-query";

interface GetPharmaciesParams {
  lat?: string | null;
  lng?: string | null;
}

export type PharmacyWithDistance = Pharmacy & { distance: number };

const useGetPrescriptionPharmacies = ({ lat, lng }: GetPharmaciesParams) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    enabled: !!lat && !!lng,
    queryKey: ["pharmacies", lat, lng],
    queryFn: async () => {
      const url =
        lat && lng
          ? `/prescriptions/pharmacies?lat=${lat}&lng=${lng}`
          : "/prescriptions/pharmacies";

      const response = await axiosInstance.get(url);
      
      return response.data.data;
    },
  });
};

export default useGetPrescriptionPharmacies;
