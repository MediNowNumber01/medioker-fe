import SuperadminLayout from "@/components/layouts/SuperadminLayout";

export default function BasedSuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SuperadminLayout>{children}</SuperadminLayout>;
}
