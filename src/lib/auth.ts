import {
  NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
} from "@/config/env";
import { axiosInstance } from "@/lib/axios";
import { Role } from "@/types/account";
import { AxiosError } from "axios";
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { toast } from "sonner";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Google({
      clientId: NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
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
    async signIn({ profile, account, user }) {
      // if (account?.provider === "google") {
      //   const response = await axiosInstance.post("/auth/google-login", {
      //     token: account.access_token,
      //     tokenId: account.id_token,
      //   });

      //   user.id = response.data.id;
      //   user.fullName = response.data.fullName;
      //   user.profilePict = response.data.profilePict;
      //   user.role = response.data.role;
      //   user.email = response.data.email;
      //   user.isVerified = response.data.isVerified;
      //   user.accessToken = response.data.accessToken;
      //   user.provider = response.data.provider;
      // }
      if (account?.provider === "google") {
        try {
          const response = await axiosInstance.post("/auth/google-login", {
            token: account.access_token,
          });

          // Jika sukses, perkaya objek `user` untuk diteruskan ke `jwt`
          const backendData = response.data.data;
          user.id = backendData.id;
          user.fullName = backendData.fullName;
          user.email = backendData.email;
          user.role = backendData.role;
          user.profilePict = backendData.profilePict;
          user.isVerified = backendData.isVerified;
          user.accessToken = backendData.accessToken;

          return true; // Lanjutkan proses login
        } catch (error) {
          const axiosError = error as AxiosError<{ message: string }>;

          if (
            axiosError.response?.status === 400 ||
            axiosError.response?.status === 409
          ) {
            const errorMessage =
              axiosError.response?.data?.message ||
              "Please log in using your credentials.";

            const redirectUrl = `/login?error=${encodeURIComponent(
              errorMessage
            )}`;
            return redirectUrl; 
          }
          return "/error?error=OAuthAccountNotLinked";
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }: any) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
});
