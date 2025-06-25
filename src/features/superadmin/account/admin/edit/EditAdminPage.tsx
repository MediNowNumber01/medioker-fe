'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useGetAccountById from "@/hooks/api/account/useGetAccountById";
import { EditAdminForm } from "./components/EditAdminForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function EditAdminPage({ accountId }: { accountId: string }) {
  const { data: admin, isLoading, error } = useGetAccountById(accountId);

  if (isLoading) return <div>Loading admin data...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!admin) return <div>Admin not found.</div>;

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <div className="mb-4">
        <Link href="/superadmin/accounts/admins">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Admin List
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Admin Account</CardTitle>
          <CardDescription>Update the details for {admin.fullName}.</CardDescription>
        </CardHeader>
        <CardContent>
          <EditAdminForm admin={admin} />
        </CardContent>
      </Card>
    </div>
  );
}