"use client"; // <-- TAMBAHKAN BARIS INI

import Image from "next/image";
import Link from "next/link";
import ResetPasswordForm from "./components/ResetPasswordForm";

interface ResetPasswordPageProps {
  token: string;
}

// Komponen ini sekarang secara eksplisit adalah Client Component
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

        {/* Form ini sekarang aman untuk dirender karena parent-nya adalah Client Component */}
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}