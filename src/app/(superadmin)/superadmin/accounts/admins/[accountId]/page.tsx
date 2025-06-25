"use client";
import EditAdminPage from "@/features/superadmin/account/admin/edit/EditAdminPage";
import { useParams } from "next/navigation";

export default function Page() {
   const params = useParams();
   const accountId = params.accountId as string;
  return <EditAdminPage accountId={accountId} />;
}