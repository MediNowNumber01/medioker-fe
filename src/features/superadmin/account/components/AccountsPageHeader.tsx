
"use client";

import { Card, CardContent } from "@/components/ui/card";
import useGetAllAccounts from "@/hooks/api/account/useGetAllAccounts";
import { CheckCircle, Shield, User, Users } from "lucide-react";

export default function AccountsPageHeader() {
  const { data, isLoading } = useGetAllAccounts({ take: 1 });

  const summary = {
    total: data?.meta.total ?? 0,
    admins: data?.countAdmin ?? 0,
    users: data?.countUser ?? 0,
    verified: data?.countVerified ?? 0,
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Account Management
        </h1>
        <p className="text-muted-foreground">
          View and filter all user and admin accounts in the system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Accounts
                </p>
                {isLoading ? (
                  <div className="h-7 w-12 mt-1 bg-muted animate-pulse rounded-md" />
                ) : (
                  <p className="text-2xl font-bold">{summary.total}</p>
                )}
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
           <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Admins
                </p>
                {isLoading ? (
                  <div className="h-7 w-12 mt-1 bg-muted animate-pulse rounded-md" />
                ) : (
                  <p className="text-2xl font-bold">{summary.admins}</p>
                )}
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
           <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Users
                </p>
                {isLoading ? (
                  <div className="h-7 w-12 mt-1 bg-muted animate-pulse rounded-md" />
                ) : (
                  <p className="text-2xl font-bold">{summary.users}</p>
                )}
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <User className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Verified
                </p>
                 {isLoading ? (
                  <div className="h-7 w-12 mt-1 bg-muted animate-pulse rounded-md" />
                ) : (
                  <p className="text-2xl font-bold">{summary.verified}</p>
                )}
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <CheckCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}