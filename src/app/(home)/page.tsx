'use client'
import HomePage from "@/features/homepage/HomePage";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const session = useSession();
  const logout = () => {
    signOut();
    redirect("/");
  };

  // if(session.data?.user?.role === "ADMIN" || "SUPER_ADMIN") redirect("/dashboard")

  return (
    <div>
      <HomePage />
    </div>
  );
}
