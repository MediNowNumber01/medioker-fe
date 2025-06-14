'use client'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useGoogleAuth = () => {
  const login = async () => {
    // const router = useRouter();
    try {
      // const lastPath = localStorage.getItem("lastPath") || "/";
      // console.log("Last path from localStorage:", lastPath); // Debugging

      const result = await signIn("google", {
        redirect: false,
        callbackUrl:"/",
      });
      

      if (result?.error) {
        toast.error("Google login failed");
        return;
      }

      return result
    //   console.log("result", result);
      // if (result?.ok) {
      //   // console.log("Redirecting to:", lastPath); // Debugging
      //   // window.location.href = lastPath; // Use window.location.href for redirection
      //   // router.push(`/${lastPath}`||"/");
      // }
    } catch (error) {
      console.error("Authentication failed:", error);
      toast.error("Authentication failed");
    }
  };

  return { login };
};
