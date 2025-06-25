import { SuperAdminSidebar } from "@/components/SuperAdminSidebar";
import { SuperAdminHeader } from "@/components/SuperAdminSidebarHeader";
import { auth } from "@/lib/auth";
import NuqsProvider from "@/providers/NuqsProvider";
import { redirect } from "next/navigation";
import type React from "react";

export default async function SuperadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) return redirect("/login");
  if (session.user?.role !== "SUPER_ADMIN") return redirect("/");

  return (
    <div className="flex flex-1 flex-col">
      <SuperAdminHeader />
      <SuperAdminSidebar />
      <NuqsProvider>{children}</NuqsProvider>
    </div>
  );
}
