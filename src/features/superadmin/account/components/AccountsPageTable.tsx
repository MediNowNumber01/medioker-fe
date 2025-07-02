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
import useGetAllAccounts from "@/hooks/api/account/useGetAllAccounts";
import formatDate from "@/lib/formatDate";
import { generateInitials } from "@/lib/generateInitials";
import getProviderBadgeVariant from "@/lib/getProviderBadgeVariant";
import getRoleBadgeVariant from "@/lib/getRoleBadgeVariant";
import {
  ArrowUpDown,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  Users,
  XCircle,
} from "lucide-react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";
import AccountsPageSkeleton from "./AccountsPageSkeleton";

export default function AccountsPageTable() {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );
  const [role, setRole] = useQueryState(
    "role",
    parseAsString.withDefault("all")
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

  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [debouncedSearch, role, verification, sortBy, sortDir, setPage]);

  const { data, isLoading, error, refetch } = useGetAllAccounts({
    page,
    take: 10,
    search: debouncedSearch,
    sortBy,
    sortOrder: sortDir as "asc" | "desc",
    ...(role !== "all" && { role }),
    ...(verification !== "all" && { isVerified: verification === "verified" }),
  });

  const accounts = data?.data || [];
  const meta = data?.meta || {
    page: 1,
    take: 10,
    total: 0,
    hasNext: false,
    hasPrevious: false,
    totalPages: 1,
  };

  const handleSort = (column: string) => {
    const newDirection =
      sortBy === column && sortDir === "asc" ? "desc" : "asc";
    setSortBy(column);
    setSortDir(newDirection);
  };

  if (isLoading) return <AccountsPageSkeleton isTableOnly />;
  if (error) return <div>Error...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          All Accounts
        </CardTitle>
        <CardDescription>
          <div className="flex justify-between">
            <div>Browse, search, and filter all accounts in the system.</div>
            <div className="flex items-center justify-center">
              <Badge variant="secondary" className="text-xs">
                View Only
              </Badge>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filter controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={role} onValueChange={(v) => setRole(v || "all")}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="USER">User</SelectItem>
            </SelectContent>
          </Select>
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

        {/* Tabel Data */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("fullName")}
                  >
                    User <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("role")}>
                    Role <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("createdAt")}
                  >
                    Joined <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No accounts found.
                  </TableCell>
                </TableRow>
              ) : (
                accounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={account.profilePict || undefined}
                            alt={account.fullName}
                          />
                          <AvatarFallback>
                            {generateInitials(account.fullName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{account.fullName}</p>
                          <p className="text-sm text-muted-foreground">
                            {account.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(account.role)}>
                        {account.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {account.isVerified ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        <span
                          className={`text-sm ${
                            account.isVerified
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {account.isVerified ? "Verified" : "Unverified"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getProviderBadgeVariant(account.provider!)}
                      >
                        {account.provider}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {formatDate(account.createdAt)}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Kontrol Paginasi */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{accounts.length}</strong> of{" "}
            <strong>{meta.total}</strong> accounts
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={!meta.hasPrevious}
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            <span className="text-sm font-medium px-2">
              Page {meta.page} of {meta.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={!meta.hasNext}
            >
              <ChevronRight className="h-4 w-4" />
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
