import { SuperAdminSidebar } from "@/components/SuperAdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SuperadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) return redirect("/login");
  if (session.user?.role !== "SUPER_ADMIN") return redirect("/");
  return <>{children}</>;
}
