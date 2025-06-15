import {
  NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
} from "@/config/env";
import { axiosInstance } from "@/lib/axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

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
      profile(profile) {
        // Mapping data dari Google
        return {
          id: profile.sub,
          name: profile.name, // Nama default dari Google
          email: profile.email,
          role: profile.role,
          profilePict: profile.picture,
          fullName: profile.name, // Mapping ke fullName
          isVerified: profile.email_verified, // Mapping ke isVerified
          // profilePict: profile.picture
        };
      },
    }),
    Credentials({
      async authorize(user) {
        if (user) return user;
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
    async signIn({ account, profile, user }) {
      if (account?.provider === "google") {
        try {
          const response = await axiosInstance.post("/auth/google-login", {
            token: account.access_token, //body
          });

          console.log(response.data.profilePict);

          if (response.data) {
            // user.id = response.data.id;
            // user.fullName = response.data.fullName;
            // user.isVerified = response.data.isVerified;
            // user.profilePict = response.data.profilePict
            profile!.backendData = response.data;

            return true;
          }
        } catch (error) {
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google") {
        token.accessToken = account.access_token;

        // Tambahkan data dari Google profile
        token.fullName = profile?.fullName;
        token.isVerified = profile?.isVerified;
        token.profilePict = profile?.picture;

        // Jika ada data tambahan dari backend
        if (profile?.backendData) {
          token.backendData = profile.backendData;
        }
      }
      if (user) token.user = user;

      return token;
    },
    async session({ session, token }: any) {
      // if (token) {
      //   session.accessToken = token.accessToken;

      //   // Prioritaskan data dari backend jika ada
      //   if (token.backendData) {
      //     session.user = {
      //       ...token.backendData,
      //       fullName: token.fullName || token.backendData.fullName,
      //       isVerified: token.isVerified || token.backendData.isVerified,
      //       profilePict: token.profilePict || token.backendData.profilePict,
      //     };
      //   } else {
      //     session.user = {
      //       ...token.user,
      //       fullName: token.fullName,
      //       isVerified: token.isVerified,
      //       profilePict: token.profilePict,
      //     };
      //   }
      // }
      if (token) {
        session.accessToken = token.accessToken;
        session.user = token.backendData?.user || token.user;
        session.backendToken = token.backendData?.token;
      }
      
      return session;
    },
  },
});
