import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SuperAdminSidebar } from "../SuperAdminSidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) return redirect("/login");
  if (session.user?.role !== "ADMIN") return redirect("/");
  return (
    <SidebarProvider>
      <SuperAdminSidebar />
      <>
        <SidebarTrigger />
        {children}
      </>
    </SidebarProvider>
  );
}
