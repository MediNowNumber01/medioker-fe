import ResetPasswordPage from "@/features/auth/reset-password/ResetPasswordPage";
import { axiosInstance } from "@/lib/axios";
import { notFound, redirect } from "next/navigation";
import React from "react";

const ResetPassword = async ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  async function verifyToken(token: string) {
    try {
      await axiosInstance.get(`/auth/verify-reset-token/${token}`);
      return { isValid: true };
    } catch (error) {
      return { isValid: false };
    }
  }

  const token = (await params).token;

  const { isValid } = await verifyToken(token);

  if (!isValid) {
    redirect("/")
  }
  return <ResetPasswordPage token={token} />;
};

export default ResetPassword;
