"use client";

import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { Account } from "@/types/account";
import { PageableResponse, PaginationQueries } from "@/types/search/response/PaginationResponse";

// Definisikan tipe query spesifik untuk hook ini
interface GetAdminsQueries extends PaginationQueries {
  // Anda bisa menambahkan filter lain di sini jika backend mendukung
  // contoh: sortBy?: string;
}

const useGetAllAdmins = (queries?: GetAdminsQueries) => {
  const { axiosInstance } = useAxios(); // Menggunakan instance axios yang terotentikasi

  return useQuery<PageableResponse<Account>>({
    // Query key dibuat unik dan dinamis berdasarkan query yang diberikan
    queryKey: ["get-all-admins", queries],
    
    queryFn: async () => {
      // Panggil endpoint backend dengan parameter query
      const { data } = await axiosInstance.get("/accounts/admins", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetAllAdmins;