import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Menghasilkan inisial dari nama lengkap.
 * - "Hibban Faruq" -> "HF"
 * - "Hibban" -> "H"
 * - "Muhammad Hibban Faruq" -> "MF" (mengambil kata pertama dan terakhir)
 * @param name - Nama lengkap pengguna.
 * @returns String berisi 1 atau 2 karakter inisial dalam huruf besar, atau "?" jika nama tidak valid.
 */
export function generateInitials(name: string | null | undefined): string {
  // Jika nama tidak ada atau kosong, kembalikan karakter default
  if (!name) {
    return "?";
  }

  // Bersihkan spasi berlebih dan pisahkan nama menjadi beberapa kata
  const words = name.trim().split(/\s+/).filter(Boolean);

  // Jika tidak ada kata yang valid setelah dipisahkan
  if (words.length === 0) {
    return "?";
  }

  // Jika hanya ada satu kata, ambil huruf pertama
  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  // Jika lebih dari satu kata, ambil huruf pertama dari kata pertama dan kata terakhir
  const firstInitial = words[0][0];
  const lastInitial = words[words.length - 1][0];

  return `${firstInitial}${lastInitial}`.toUpperCase();
}