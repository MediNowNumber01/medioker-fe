"use client";

import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query"; // 1. Ganti import menjadi useQuery

const useVerifyResetToken = (token: string) => {
  const { axiosInstance } = useAxios();

  // 2. Ganti `useMutation` menjadi `useQuery`
  return useQuery({
    // queryKey harus unik untuk setiap token
    queryKey: ["verify-reset-token", token],
    
    // queryFn adalah fungsi untuk mengambil data
    queryFn: async () => {
      // Panggil endpoint backend untuk verifikasi
      const { data } = await axiosInstance.get( // 3. Ganti menjadi .get
        `/auth/verify-reset-token/${token}`
      );
      return data; 
    },
    
    // Opsi ini sekarang akan berfungsi dengan benar di useQuery
    retry: false, // Jangan coba lagi jika token gagal sekali
    refetchOnWindowFocus: false, // Tidak perlu refetch saat user kembali ke tab
    enabled: !!token, // Hanya jalankan query ini jika `token` ada nilainya
  });
};

export default useVerifyResetToken;