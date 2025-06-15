// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    fullName?: string;
    isVerified?: boolean;
    profilePict?: string;
    role?: Role;
    accessToken?: string
  }

  interface Session {
    user?: User;
  }

  export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}
}