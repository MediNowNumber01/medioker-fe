// src/types/next-auth.d.ts
import { DefaultSession } from "next-auth";
import { Role } from "./account"; // Mengimpor Role dari file yang sudah ada

declare module "next-auth" {
  /**
   * Tipe untuk objek Session yang akan digunakan di client-side
   */
  interface Session {
    user: {
      id: string;
      fullName: string;
      email: string;
      role: Role;
      profilePict?: string | null;
    } & DefaultSession["user"]; // Menggabungkan dengan tipe default
    
    // accessToken berada di sini, di level atas Session
    accessToken: string;
  }

  /**
   * Tipe untuk objek User yang digunakan dalam alur internal Next-Auth
   * (misalnya dari `authorize` atau `profile` callback)
   */
  interface User {
    id: string;
    fullName: string;
    email: string;
    role: Role;
    profilePict?: string | null;
    accessToken: string; // accessToken tetap ada di sini untuk alur internal
  }
}

declare module "next-auth/jwt" {
  /**
   * Tipe untuk token JWT
   */
  interface JWT {
    id: string;
    fullName: string;
    email: string;
    role: Role;
    profilePict?: string | null;
    accessToken: string;
  }
}