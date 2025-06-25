import AdminLayout from "@/components/layouts/AdminLayout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function BasedSuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
    if (!session) return redirect("/login");
    if (session.user?.role !== "ADMIN") return redirect("/");
  return <AdminLayout>{children}</AdminLayout>;
}
