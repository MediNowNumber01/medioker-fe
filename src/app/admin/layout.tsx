import AdminLayout from "@/components/layouts/AdminLayout";

export default function BasedSuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
