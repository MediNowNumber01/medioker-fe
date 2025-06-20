import { DefaultSession } from "next-auth";
import { Role } from "./account"; // Impor Role

declare module "next-auth" {
 
  interface Session {
    user: {
      id: string;
      fullName: string;
      email: string;
      isVerified: boolean
      role: Role;
      profilePict?: string | null;
      
    } & DefaultSession["user"]; 
    
    accessToken: string;
  }


  interface User {
    id: string;
    fullName: string;
    email: string;
    isVerified?: boolean
    role: Role;
    profilePict?: string | null;
    addresses?: UserAddress[]
    accessToken: string;
   provider: string
  }
}

declare module "next-auth/jwt" {
 
  interface JWT {
    id: string;
    fullName: string;
    isVerified: boolean
    email: string;
    role: Role;
    profilePict?: string | null;
    accessToken: string;

  }
}