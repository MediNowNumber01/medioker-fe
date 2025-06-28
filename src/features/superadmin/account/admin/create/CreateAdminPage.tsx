'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateAdminForm } from "./components/CreateAdminForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function CreateAdminPage() {
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
          <CardTitle>Create New Admin</CardTitle>
          <CardDescription>Fill out the form below to add a new admin to the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateAdminForm />
        </CardContent>
      </Card>
    </div>
  );
}