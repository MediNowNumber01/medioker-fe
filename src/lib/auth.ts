import {
  NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
} from "@/config/env";
import { axiosInstance } from "@/lib/axios";
import NextAuth, { User, Session } from "next-auth"; // Hapus JWT dari sini
import { JWT } from "next-auth/jwt"; // 1. Impor JWT dari 'next-auth/jwt'
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Google({
      clientId: NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      authorization: { /* ... */ },
    }),
    Credentials({
      async authorize(credentials) {
        if (credentials) return credentials as unknown as User;
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === "google" || account?.provider === "credentials") {
        return true;
      }
      return false;
    },

    async jwt({ token, user, account }) {
      if (account && user) {
        if (account.provider === "google") {
          try {
            const response = await axiosInstance.post("/auth/google-login", {
              token: account.access_token,
            });
            const backendUser = response.data.data;

            token.id = backendUser.id;
            token.fullName = backendUser.fullName;
            token.email = backendUser.email;
            token.role = backendUser.role;
            token.profilePict = backendUser.profilePict;
            token.accessToken = backendUser.accessToken;
          } catch (error) {
            console.error("Google login to backend failed:", error);
            return null;
          }
        } else if (account.provider === "credentials") {
          token.id = user.id;
          token.fullName = user.fullName;
          token.email = user.email;
          token.role = user.role;
          token.profilePict = user.profilePict;
          token.accessToken = user.accessToken;
        }
      }
      return token;
    },

    // 2. Perbaiki logika dan tipe di callback session
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        // Isi `session.user` tanpa `accessToken`
        session.user = {
          id: token.id,
          fullName: token.fullName,
          email: token.email,
          role: token.role,
          profilePict: token.profilePict,
          accessToken: session.accessToken
        };
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});