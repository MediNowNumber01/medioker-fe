"use client";

import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import ResetPasswordPage from "@/features/auth/reset-password/ResetPasswordPage";
import useVerifyResetToken from "@/hooks/api/auth/useVerifyTokenIsValid";

export default function ResetPasswordTokenRoute() {
  const params = useParams();
  const token = params.token as string;

  if (!token) {
    redirect(`/login`);
  }

  if (!token) {
    redirect(`/login`);
  }

  const { isLoading, isError, error } = useVerifyResetToken(token);

  useEffect(() => {
    if (isError) {
      const axiosError = error as any;
      const errorMessage =
        axiosError.response?.data?.message ||
        "Your password reset link is invalid or has expired.";

      toast.error(errorMessage);
      redirect(`/login`);
    }
  }, [isError, error]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return <ResetPasswordPage token={token} />;
}
