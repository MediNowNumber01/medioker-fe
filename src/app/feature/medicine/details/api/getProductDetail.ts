import { axiosInstance } from "@/lib/axios";

const getProductDetail = async (slug: string) => {
  const response = await axiosInstance.get(`/products/${slug}`);

  if (response.status !== 200) {
    throw new Error(`Error fetching product details: ${response.statusText}`);
  }

  return response.data;
};

export default getProductDetail;
