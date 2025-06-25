"use client";

import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";

const useVerifyResetToken = (token: string) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    // queryKey harus unik untuk setiap token
    queryKey: ["verify-reset-token", token],
    
    queryFn: async () => {
      // Panggil endpoint backend untuk verifikasi
      const { data } = await axiosInstance.get(
        `/auth/verify-reset-token/${token}`
      );
      // Jika request berhasil (tidak melempar error), token dianggap valid
      return data; 
    },
    
    // Opsi tambahan untuk mengoptimalkan
    retry: false, // Jangan coba lagi jika token gagal sekali
    refetchOnWindowFocus: false, // Tidak perlu refetch saat user kembali ke tab
    enabled: !!token, // Hanya jalankan query ini jika `token` ada nilainya
  });
};

export default useVerifyResetToken;