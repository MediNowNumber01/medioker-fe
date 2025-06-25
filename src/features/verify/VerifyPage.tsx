"use client";

import { Button } from "@/components/ui/button";
import useVerifyAccount from "@/hooks/api/auth/useVerifyAccount";
import { CheckCircle, LoaderCircle, TriangleAlert } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

interface VerifyPageProps {
  token: string;
}

export default function VerifyPage({ token }: VerifyPageProps) {
  const {
    mutate: verifyAccount,
    isPending,
    isSuccess,
    isError,
    error,
  } = useVerifyAccount();

  useEffect(() => {
    if (token) {
      verifyAccount(token);
    }
  }, [token, verifyAccount]);

  useEffect(() => {
    if (isSuccess) {
      signOut({ redirect: false });
    }
  }, [isSuccess]); 

  const renderContent = () => {
    if (isPending) {
      return (
        <>
          <LoaderCircle className="h-16 w-16 animate-spin text-primary" />
          <h1 className="text-2xl font-bold mt-4">Verifying Your Account...</h1>
          <p className="text-muted-foreground">Please wait a moment.</p>
        </>
      );
    }

    if (isError) {
      const axiosError = error as any;
      const errorMessage =
        axiosError.response?.data?.message || "Verification failed.";
      return (
        <>
          <TriangleAlert className="h-16 w-16 text-destructive" />
          <h1 className="text-2xl font-bold mt-4">Verification Failed</h1>
          <p className="text-muted-foreground">{errorMessage}</p>
          <p className="text-muted-foreground text-sm">
            This link may be invalid or expired.
          </p>
          <Link href="/profile">
            <Button className="mt-4">Back to Profile</Button>
          </Link>
        </>
      );
    }

    if (isSuccess) {
      return (
        <>
          <CheckCircle className="h-16 w-16 text-green-500" />
          <h1 className="text-2xl font-bold mt-4">Account Verified!</h1>
          <p className="text-muted-foreground">
            You can now access all features.
          </p>
          <Link href="/login">
            <Button className="mt-4">Go to Login</Button>
          </Link>
        </>
      );
    }

    return null; 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
      {renderContent()}
    </div>
  );
}
