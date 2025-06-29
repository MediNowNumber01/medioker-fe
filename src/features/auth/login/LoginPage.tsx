"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LoginForm } from "./components/LoginForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  return (
    <div className="bg-muted flex h-[calc(100svh-68.67px)] flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
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

        <LoginForm redirectUrl={callbackUrl} />
      </div>
    </div>
  );
}
