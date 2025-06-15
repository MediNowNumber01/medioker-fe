import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetProductDetails = (slug: string) => {
  return useQuery({
    queryKey: ["productDetails", slug],
    queryFn: async () => {
      const response = await axiosInstance.get(`/products/${slug}`);
      if (response.status !== 200) {
        throw new Error(
          `Error fetching product details: ${response.statusText}`
        );
      }
      return response.data;
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
