import ResetPasswordPage from "@/features/auth/reset-password/ResetPasswordPage";
import { axiosInstance } from "@/lib/axios";
import { redirect } from "next/navigation";

async function verifyTokenIsValid(token: string): Promise<boolean> {
  try {
    await axiosInstance.get(`/auth/verify-reset-token/${token}`);
    return true; 
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
}

export default async function ResetPasswordTokenRoute({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;

  const isTokenValid = await verifyTokenIsValid(token);

  if (!isTokenValid) {
    const errorMessage = encodeURIComponent(
      "Your password reset link is invalid or has expired."
    );
    redirect(`/login?error=${errorMessage}`);
  }

  return <ResetPasswordPage token={token} />;
}
