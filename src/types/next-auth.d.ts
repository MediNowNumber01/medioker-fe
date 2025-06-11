// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    fullName?: string;
    isVerified?: boolean;
  }

  interface Session {
    user?: User;
  }
}