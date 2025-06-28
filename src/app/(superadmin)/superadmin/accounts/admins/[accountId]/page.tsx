import EditAdminPage from "@/features/superadmin/account/admin/edit/EditAdminPage";

export default async function Page({
    params
}: {
    params: Promise<{accountId:string}>
}) {
  const accountId = (await params).accountId
  return <EditAdminPage accountId={accountId} />;
}