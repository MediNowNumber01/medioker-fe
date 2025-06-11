"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
} from "@/config/env";
import { redirect } from "next/navigation";
import HomePage from "@/features/homepage/HomePage";

export default function Home() {
  const session = useSession();
  const logout = () => {
    signOut();
    redirect("/");
  };

  return (
    <div>
      <HomePage />
    </div>
  );
}
