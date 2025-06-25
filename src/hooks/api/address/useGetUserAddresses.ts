"use client";

import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";



const useGetUserAddresses = () => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["userAddresses"],
    queryFn: async () => {
      
      const response = await axiosInstance.get("/addresses");

      return response.data;
    },
  });
};

export default useGetUserAddresses;
