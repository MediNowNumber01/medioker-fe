import { DefaultSession } from "next-auth";
import { Role } from "./account"; 
import { string } from "yup";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      fullName: string;
      email: string;
      isVerified: boolean | string
      role: Role;
      profilePict?: string | null;
      createdAt: number;
      provider?: string;
    } & DefaultSession["user"];

    accessToken: string;
  }

  interface User {
    id: string;
    fullName: string;
    email: string;
    isVerified?: boolean | string
    role: Role;
    profilePict?: string | null;
    addresses?: UserAddress[];
    accessToken: string;
    createdAt: number;
    provider?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    fullName: string;
    isVerified: boolean | string
    email: string;
    role: Role;
    profilePict?: string | null;
    accessToken: string;
    createdAt: number;
    provider?: string;
  }
}
