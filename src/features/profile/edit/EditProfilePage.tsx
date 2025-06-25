"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditProfileForm } from "./components/EditProfileForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import useGetAccount from "@/hooks/api/profile/useGetAccount";

export default function EditProfilePage() {
  const { data: user, isLoading } = useGetAccount();
  return (
    <div className="container mx-auto max-w-lg py-8">
      <Link href="/profile">
        <Button variant="ghost" className="mb-4">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Profile
        </Button>
      </Link>
      <Card className="mx-2">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>
            Update your personal information here.
          </CardDescription>
        </CardHeader>
        <CardContent >
          <EditProfileForm user={user} isLoading={isLoading}/>
        </CardContent>
      </Card>
    </div>
  );
}
