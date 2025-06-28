"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUpDown,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Edit,
  LoaderCircle,
  Search,
  Shield,
  Trash2,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import type React from "react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

// Hooks & Types
import useDeleteAdmin from "@/hooks/api/admin/useDeleteAdmin";
import useGetAdmins from "@/hooks/api/admin/useGetAdmins";
import formatDate from "@/lib/formatDate";
import { generateInitials } from "@/lib/generateInitials";
import getProviderBadgeVariant from "@/lib/getProviderBadgeVariant";
import type { Account } from "@/types/account";
import { AdminRole } from "@/types/admin";

// Separate hook for stats that doesn't depend on search/filter params

// Type definitions
type AdminWithAccount = {
  id: string;
  adminRole: AdminRole;
  account: Account;
};

export default function AdminAccountsPage() {
  const router = useRouter();

  // State Management with nuqs for URL persistence
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );
  const [verification, setVerification] = useQueryState(
    "verified",
    parseAsString.withDefault("all")
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [sortBy, setSortBy] = useQueryState(
    "sortBy",
    parseAsString.withDefault("createdAt")
  );
  const [sortDir, setSortDir] = useQueryState(
    "sortDir",
    parseAsString.withDefault("desc")
  );

  const [debouncedSearch] = useDebounce(search, 500);

  // UI State for modals
  const [selectedAdmin, setSelectedAdmin] = useState<Account | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<Account | null>(null);

  // Reset page when search/filter changes
  useEffect(() => {
    if (page !== 1) setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, verification]);

  // API Hooks - Separate stats from filtered data
  const { data: statsData, isLoading: statsLoading } = useGetAdmins({}); // This hook should fetch total stats without filters
  const { data, isLoading, error, refetch } = useGetAdmins({
    page,
    take: 10,
    search: debouncedSearch,
    sortBy,
    sortOrder: sortDir as "asc" | "desc",
    ...(verification !== "all" && { isVerified: verification === "verified" }),
  });
  const { mutate: deleteAdmin, isPending: isDeleting } = useDeleteAdmin();

  const admins = data?.data || [];
  const meta = data?.meta || {
    page: 1,
    take: 10,
    total: 0,
    hasNext: false,
    hasPrevious: false,
    totalPages: 1,
  };

  const totalAdmins = statsData?.meta.total || 0;
  const verifiedCount = statsData?.countVerified;

  const handleSort = (column: string) => {
    const newDirection =
      sortBy === column && sortDir === "asc" ? "desc" : "asc";
    setSortBy(column);
    setSortDir(newDirection);
  };

  const handleRowClick = (adminAccount: Account) => {
    setSelectedAdmin(adminAccount);
    setShowDetailModal(true);
  };

  const handleDeleteClick = (e: React.MouseEvent, adminAccount: Account) => {
    e.stopPropagation();
    setAdminToDelete(adminAccount);
    setShowDeleteModal(true);
  };

  const handleEditAdmin = () => {
    if (selectedAdmin) {
      router.push(`/superadmin/accounts/admins/${selectedAdmin.id}`);
    }
  };

  const handleDeleteConfirm = () => {
    if (adminToDelete) {
      deleteAdmin(adminToDelete.id, {
        onSuccess: () => {
          setShowDeleteModal(false);
          setAdminToDelete(null);
        },
      });
    }
  };

  if (isLoading && admins.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-64 bg-muted animate-pulse rounded-md"></div>
          <div className="h-4 w-96 bg-muted animate-pulse rounded-md"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
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
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Admin Management
          </h1>
          <p className="text-muted-foreground">
            Manage all admin accounts in the system
          </p>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <div className="flex flex-col items-center gap-4">
                <div className="p-3 rounded-full bg-red-100">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Failed to load admin accounts
                  </h3>
                  <p className="text-muted-foreground">
                    There was an error loading the admin data.
                  </p>
                </div>
                <Button onClick={() => refetch()}>Try Again</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Admin Management
          </h1>
          <p className="text-muted-foreground">
            Manage all admin accounts in the system
          </p>
        </div>
        <Button
          onClick={() => router.push("/superadmin/accounts/admins/create")}
          className="gap-2 shrink-0"
        >
          <Shield className="h-4 w-4" />
          Add Admin
        </Button>
      </div>

      {/* Stats Cards - Only Total Admins and Verified */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Admins
                </p>
                <div className="text-2xl font-bold">
                  {statsLoading ? (
                    <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
                  ) : (
                    totalAdmins
                  )}
                </div>
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
                <p className="text-sm font-medium text-muted-foreground">
                  Verified
                </p>
                <p className="text-2xl font-bold">
                  {statsLoading ? (
                    <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
                  ) : (
                    verifiedCount
                  )}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <CheckCircle className="h-6 w-6 text-blue-600" />
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
          <CardDescription>
            View and manage all admin accounts. Click on a row to view details.
          </CardDescription>
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
            <Select
              value={verification}
              onValueChange={(v) => setVerification(v || "all")}
            >
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
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("fullName")}
                      className="h-auto p-0 font-semibold"
                    >
                      Admin
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("createdAt")}
                      className="h-auto p-0 font-semibold"
                    >
                      Created
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <LoaderCircle className="h-8 w-8 animate-spin mx-auto text-primary" />
                    </TableCell>
                  </TableRow>
                ) : admins.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <Shield className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          No admin accounts found
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  admins.map((admin: AdminWithAccount) => (
                    <TableRow
                      key={admin.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleRowClick(admin.account)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={admin.account.profilePict || undefined}
                              alt={admin.account.fullName}
                            />
                            <AvatarFallback>
                              {generateInitials(admin.account.fullName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {admin.account.fullName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {admin.account.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {admin.account.isVerified ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                          <span
                            className={`text-sm ${
                              admin.account.isVerified
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {admin.account.isVerified
                              ? "Verified"
                              : "Unverified"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getProviderBadgeVariant(
                            admin.account.provider!
                          )}
                        >
                          {admin.account.provider}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {formatDate(admin.account.createdAt)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleDeleteClick(e, admin.account)}
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
              Showing <strong>{admins.length}</strong> of{" "}
              <strong>{meta.total}</strong> admin accounts
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={!meta.hasPrevious || isLoading}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm font-medium px-2">
                Page {meta.page} of {meta.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={!meta.hasNext || isLoading}
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
            <DialogDescription>
              View and manage admin account information
            </DialogDescription>
          </DialogHeader>
          {selectedAdmin && (
            <div className="space-y-6">
              {/* Profile Section */}
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={selectedAdmin.profilePict || undefined}
                    alt={selectedAdmin.fullName}
                  />
                  <AvatarFallback className="text-lg">
                    {generateInitials(selectedAdmin.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {selectedAdmin.fullName}
                  </h3>
                  <p className="text-muted-foreground">{selectedAdmin.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="default">ADMIN</Badge>
                    <Badge
                      variant={getProviderBadgeVariant(selectedAdmin.provider!)}
                    >
                      {selectedAdmin.provider}
                    </Badge>
                    {selectedAdmin.isVerified ? (
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-600"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-red-600 border-red-600"
                      >
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
                  <label className="text-sm font-medium text-muted-foreground">
                    Account ID
                  </label>
                  <p className="text-sm font-mono bg-muted p-2 rounded">
                    {selectedAdmin.id}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Role
                  </label>
                  <p className="text-sm">{selectedAdmin.role}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Provider
                  </label>
                  <p className="text-sm">{selectedAdmin.provider}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Verification Status
                  </label>
                  <p className="text-sm">
                    {selectedAdmin.isVerified ? "Verified" : "Not Verified"}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Created At
                  </label>
                  <p className="text-sm">
                    {formatDate(selectedAdmin.createdAt)}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Last Updated
                  </label>
                  <p className="text-sm">
                    {formatDate(selectedAdmin.updatedAt)}
                  </p>
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
              Are you sure you want to delete this admin account? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {adminToDelete && (
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={adminToDelete.profilePict || undefined}
                    alt={adminToDelete.fullName}
                  />
                  <AvatarFallback>
                    {generateInitials(adminToDelete.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{adminToDelete.fullName}</p>
                  <p className="text-sm text-muted-foreground">
                    {adminToDelete.email}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting && (
                <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
              )}
              {isDeleting ? "Deleting..." : "Delete Admin"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
