"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGetAdmin from "@/hooks/api/admin/useGetAdminDetail";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { EditAdminForm } from "./components/EditAdminForm";

export default function EditAdminPage({ accountId }: { accountId: string }) {
  const { data: admin, isLoading, error } = useGetAdmin(accountId);

  if (isLoading) return <div>Loading admin data...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!admin) return <div>Admin not found.</div>;

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <div className="mb-4">
        <Link href="/superadmin/accounts/admins">
          <Button
            variant="ghost"
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Admins
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Admin Account</CardTitle>
          <CardDescription>
            Update the details for {admin.account!.fullName}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditAdminForm admin={admin} />
        </CardContent>
      </Card>
    </div>
  );
}
