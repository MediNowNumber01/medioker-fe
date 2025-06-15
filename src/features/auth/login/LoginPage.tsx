'use client'
import Image from "next/image";
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { LoginForm } from "./components/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (status === "authenticated") {
      router.push(redirect);
    }
  }, [status, router, redirect]);

  return (
    <div className="bg-muted flex h-[calc(100svh-68.67px)] flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center justify-center gap-2 self-center">
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
        
        <LoginForm redirectUrl={redirect} />
      </div>
    </div>
  )
}