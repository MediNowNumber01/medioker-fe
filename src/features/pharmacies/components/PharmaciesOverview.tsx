"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import useGetDashboardPharmacy from "@/hooks/api/Pharmacy/useGetDashboard";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { BadgeXIcon, Store, User } from "lucide-react";

const PharmaciesOverview = () => {
  const { data: dashboard ,isLoading } = useGetDashboardPharmacy();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Skeleton className="h-[200px]"></Skeleton>
        <Skeleton className="h-[200px]"></Skeleton>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <Card className="px-0 py-4 gap-4">
        <div className="flex  items-center">
          <Store className="text-primary aspect-square h-full mx-4" />
          <h2 className="text-primary">Pharmacy</h2>
        </div>
        <div className="flex flex-col text-center">
          <p className="text-muted-foreground">Total Pharmacy</p>
          <p className="text-4xl font-bold">
            {dashboard?.data.totalPharmacies || 0}
          </p>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center text-green-500 font-bold">
            <div className=""> OPEN</div>
            <div className="flex w-full justify-center items-center gap-2 text-xl">
              {dashboard?.data.openPharmacies || 0}
              <CheckBadgeIcon className="h-8 w-8 " />
            </div>
          </div>
          <div className="text-center text-red-500 font-bold">
            <div className=""> CLOSED</div>
            <div className="flex w-full justify-center items-center gap-2 text-xl">
              {dashboard?.data.closedPharmacies || 0}
              <BadgeXIcon className="h-8 w-8 " />
            </div>
          </div>
        </div>
      </Card>
      <Card className="px-0 py-4 gap-4">
        <div className="flex  items-center">
          <User className="text-primary aspect-square h-full mx-4" />
          <h2 className="text-primary">Admin</h2>
        </div>
        <div className="flex flex-col text-center">
          <p className="text-muted-foreground">Total Admin</p>
          <p className="text-4xl font-bold">
            {dashboard?.data.totalEmployees || 0}
          </p>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center text-green-500 font-bold">
            <div className=""> Assigned</div>
            <div className="flex w-full justify-center items-center gap-2 text-xl">
              {dashboard?.data.assignedEmployees || 0}
              <CheckBadgeIcon className="h-8 w-8 " />
            </div>
          </div>
          <div className="text-center text-red-500 font-bold">
            <div className=""> Unassigned</div>
            <div className="flex w-full justify-center items-center gap-2 text-xl">
              {dashboard?.data.unassignedEmployees || 0}
              <BadgeXIcon className="h-8 w-8 " />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PharmaciesOverview;
