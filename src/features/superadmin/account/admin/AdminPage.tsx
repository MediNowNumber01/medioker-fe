"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Search,
  Trash2,
  CheckCircle,
  XCircle,
  Calendar,
  Shield,
  ChevronLeft,
  ChevronRight,
  Edit,
  User,
} from "lucide-react"
import { useRouter } from "next/navigation"

import useGetAllAccounts from "@/hooks/api/account/useGetAllAccounts"
import type { Account } from "@/types/account"
import { useDebounce } from "use-debounce"
import { useQueryState } from "nuqs"
import useGetAdmins from "@/hooks/api/admin/useGetAdmins"
import useGetAllAdmins from "@/hooks/api/account/useGetAllAdmins"

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function formatDate(dateString: any): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function getProviderBadgeVariant(provider: string) {
  switch (provider) {
    case "GOOGLE":
      return "outline"
    case "CREDENTIAL":
      return "secondary"
    default:
      return "outline"
  }
}

export default function AdminAccountsPage() {
  const router = useRouter()
   const [search, setSearch] = useQueryState("search", {defaultValue: ""});
  const [verificationFilter, setVerificationFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)

  const [selectedAdmin, setSelectedAdmin] = useState<Account | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [adminToDelete, setAdminToDelete] = useState<Account | null>(null)

  const [debouncedSearchTerm] = useDebounce(search, 500)

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm, verificationFilter])

  const queryParams = {
    page: currentPage,
    take: pageSize,
    search: debouncedSearchTerm,
    ...(verificationFilter !== "all" && {
      isVerified: verificationFilter === "verified",
    }),
  }

  const { data, isLoading, error, refetch } = useGetAllAdmins(queryParams)

  const admins = data?.data || []
  const meta = data?.meta || { page: 1, take: 10, total: 0 }

  const handleRowClick = (admin: Account) => {
    setSelectedAdmin(admin)
    setShowDetailModal(true)
  }

  const handleDeleteClick = (e: React.MouseEvent, admin: Account) => {
    e.stopPropagation() // Prevent row click
    setAdminToDelete(admin)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (adminToDelete) {
      // TODO: Implement delete API call
      console.log("Deleting admin:", adminToDelete.id)
      setShowDeleteModal(false)
      setAdminToDelete(null)
      // refetch() // Refresh data after delete
    }
  }

  const handleEditAdmin = () => {
    if (selectedAdmin) {
      router.push(`/superadmin/accounts/admin/${selectedAdmin.id}`)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-64 bg-muted animate-pulse rounded-md"></div>
          <div className="h-4 w-96 bg-muted animate-pulse rounded-md"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-16 bg-muted animate-pulse rounded-md"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="h-10 bg-muted animate-pulse rounded-md"></div>
              <div className="h-64 bg-muted animate-pulse rounded-md"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Management</h1>
          <p className="text-muted-foreground">Manage all admin accounts in the system</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <div className="flex flex-col items-center gap-4">
                <div className="p-3 rounded-full bg-red-100">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Failed to load admin accounts</h3>
                  <p className="text-muted-foreground">There was an error loading the admin data.</p>
                </div>
                <Button onClick={() => refetch()}>Try Again</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalAdmins = meta.total
  const verifiedCount = admins.filter((admin) => admin.isVerified).length
  const credentialCount = admins.filter((admin) => admin.provider === "CREDENTIAL").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Management</h1>
        <p className="text-muted-foreground">Manage all admin accounts in the system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Admins</p>
                <p className="text-2xl font-bold">{totalAdmins}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Verified</p>
                <p className="text-2xl font-bold">{verifiedCount}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Credential Login</p>
                <p className="text-2xl font-bold">{credentialCount}</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <User className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Admin Accounts
          </CardTitle>
          <CardDescription>View and manage all admin accounts. Click on a row to view details.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Verification Filter */}
            <Select value={verificationFilter} onValueChange={setVerificationFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="unverified">Unverified</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Admins Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Admin</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <Shield className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">No admin accounts found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  admins.map((admin) => (
                    <TableRow
                      key={admin.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleRowClick(admin)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={admin.profilePict || undefined} alt={admin.fullName} />
                            <AvatarFallback>{getInitials(admin.fullName)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{admin.fullName}</p>
                            <p className="text-sm text-muted-foreground">{admin.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {admin.isVerified ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                          <span className={`text-sm ${admin.isVerified ? "text-green-600" : "text-red-600"}`}>
                            {admin.isVerified ? "Verified" : "Unverified"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getProviderBadgeVariant(admin.provider!)}>{admin.provider}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{formatDate(admin.createdAt)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleDeleteClick(e, admin)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Showing {admins.length} of {meta.total} admin accounts
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1 || isLoading}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                  {meta.page}
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage >= Math.ceil(meta.total / meta.take) || isLoading}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Admin Details
            </DialogTitle>
            <DialogDescription>View and manage admin account information</DialogDescription>
          </DialogHeader>

          {selectedAdmin && (
            <div className="space-y-6">
              {/* Profile Section */}
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedAdmin.profilePict || undefined} alt={selectedAdmin.fullName} />
                  <AvatarFallback className="text-lg">{getInitials(selectedAdmin.fullName)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedAdmin.fullName}</h3>
                  <p className="text-muted-foreground">{selectedAdmin.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="default">ADMIN</Badge>
                    <Badge variant={getProviderBadgeVariant(selectedAdmin.provider!)}>{selectedAdmin.provider}</Badge>
                    {selectedAdmin.isVerified ? (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-red-600 border-red-600">
                        <XCircle className="h-3 w-3 mr-1" />
                        Unverified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Account ID</label>
                  <p className="text-sm font-mono bg-muted p-2 rounded">{selectedAdmin.id}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Role</label>
                  <p className="text-sm">{selectedAdmin.role}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Provider</label>
                  <p className="text-sm">{selectedAdmin.provider}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Verification Status</label>
                  <p className="text-sm">{selectedAdmin.isVerified ? "Verified" : "Not Verified"}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Created At</label>
                  <p className="text-sm">{formatDate(selectedAdmin.createdAt)}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                  <p className="text-sm">{formatDate(selectedAdmin.updatedAt)}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDetailModal(false)}>
              Close
            </Button>
            <Button onClick={handleEditAdmin} className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Delete Admin Account
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this admin account? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {adminToDelete && (
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={adminToDelete.profilePict || undefined} alt={adminToDelete.fullName} />
                  <AvatarFallback>{getInitials(adminToDelete.fullName)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{adminToDelete.fullName}</p>
                  <p className="text-sm text-muted-foreground">{adminToDelete.email}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
