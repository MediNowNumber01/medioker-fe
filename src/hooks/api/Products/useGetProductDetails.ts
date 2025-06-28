import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetProductDetails = (slug: string) => {
  return useQuery({
    queryKey: ["productDetails", slug],
    queryFn: async () => {
      const {data} = await axiosInstance.get(`/products/${slug}`);
      
      return data.data;
    },
  });
};
