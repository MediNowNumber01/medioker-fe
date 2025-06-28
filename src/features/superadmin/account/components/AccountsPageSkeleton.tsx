import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";

const AccountsPageSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2">
        <div className="h-8 w-64 bg-muted animate-pulse rounded-md"></div>
        <div className="h-4 w-96 bg-muted animate-pulse rounded-md"></div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="h-16 bg-muted animate-pulse rounded-md"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 w-48 bg-muted animate-pulse rounded-md"></div>
          <div className="h-4 w-80 bg-muted animate-pulse rounded-md mt-2"></div>
        </CardHeader>
        <CardContent>
          <div className="h-10 bg-muted animate-pulse rounded-md mb-6"></div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {[...Array(5)].map((_, i) => (
                    <TableHead key={i}>
                      <div className="h-5 w-20 bg-muted animate-pulse rounded-md"></div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-muted animate-pulse rounded-full"></div>
                        <div className="space-y-1">
                          <div className="h-4 w-24 bg-muted animate-pulse rounded-md"></div>
                          <div className="h-3 w-32 bg-muted animate-pulse rounded-md"></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="h-6 w-20 bg-muted animate-pulse rounded-md"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-6 w-24 bg-muted animate-pulse rounded-md"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-6 w-28 bg-muted animate-pulse rounded-md"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-6 w-20 bg-muted animate-pulse rounded-md ml-auto"></div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="h-5 w-48 bg-muted animate-pulse rounded-md"></div>
            <div className="flex items-center gap-2">
              <div className="h-9 w-24 bg-muted animate-pulse rounded-md"></div>
              <div className="h-9 w-24 bg-muted animate-pulse rounded-md"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPageSkeleton;
