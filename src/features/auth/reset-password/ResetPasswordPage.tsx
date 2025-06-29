"use client";

import Image from "next/image";
import Link from "next/link";
import ResetPasswordForm from "./components/ResetPasswordForm";

interface ResetPasswordPageProps {
  token: string;
}

export default function ResetPasswordPage({ token }: ResetPasswordPageProps) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 self-center"
        >
          <Image
            src="/erlenplus.svg"
            width={40}
            height={40}
            alt="Erlenmeyer Logo"
            className="h-auto"
          />
          <Image
            src="/MediNow.svg"
            width={130}
            height={40}
            alt="MediNow Logo"
            className="h-auto"
          />
        </Link>

        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
