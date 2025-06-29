"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import useGetAdmin from "@/hooks/api/admin/useGetAdminDetail"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { EditAdminForm } from "./components/EditAdminForm"

function EditAdminPageSkeleton() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-muted rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="h-7 w-48 bg-muted rounded animate-pulse mb-2"></div>
          <div className="h-4 w-64 bg-muted rounded animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Profile Picture Skeleton */}
            <div className="grid gap-2 items-center justify-center text-center">
              <div className="h-4 w-24 bg-muted rounded animate-pulse mx-auto"></div>
              <div className="relative mx-auto h-28 w-28">
                <div className="h-28 w-28 rounded-full bg-muted animate-pulse"></div>
              </div>
              <div className="h-8 w-32 bg-muted rounded animate-pulse mx-auto mt-2"></div>
            </div>

            {/* Form Fields Skeleton */}
            <div className="space-y-6">
              {/* Full Name */}
              <div className="grid gap-2">
                <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                <div className="h-10 w-full bg-muted rounded animate-pulse"></div>
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <div className="h-4 w-12 bg-muted rounded animate-pulse"></div>
                <div className="h-10 w-full bg-muted rounded animate-pulse"></div>
              </div>

              {/* Admin Role */}
              <div className="grid gap-2">
                <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                <div className="h-10 w-full bg-muted rounded animate-pulse"></div>
              </div>

              {/* Password Section */}
              <div className="border-t pt-4 mt-4">
                <div className="h-4 w-48 bg-muted rounded animate-pulse mb-4"></div>
              </div>

              <div className="grid gap-2">
                <div className="h-4 w-28 bg-muted rounded animate-pulse"></div>
                <div className="h-10 w-full bg-muted rounded animate-pulse"></div>
              </div>

              <div className="grid gap-2">
                <div className="h-4 w-36 bg-muted rounded animate-pulse"></div>
                <div className="h-10 w-full bg-muted rounded animate-pulse"></div>
              </div>

              {/* Submit Button */}
              <div className="h-10 w-full bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function EditAdminPage({ accountId }: { accountId: string }) {
  const { data: admin, isLoading, error } = useGetAdmin(accountId)

  if (isLoading) return <EditAdminPageSkeleton />

  if (error) return <div>Error: {error.message}</div>

  if (!admin) return <div>Admin not found.</div>

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <div className="mb-4">
        <Link href="/superadmin/accounts/admins">
          <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Admins
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Admin Account</CardTitle>
          <CardDescription>Update the details for {admin.account!.fullName}.</CardDescription>
        </CardHeader>
        <CardContent>
          <EditAdminForm admin={admin} />
        </CardContent>
      </Card>
    </div>
  )
}
