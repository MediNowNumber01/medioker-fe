"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGetUserAddresses from "@/hooks/api/address/useGetUserAddresses";
import { PlusCircle, MapPin, Home, Building2 } from "lucide-react";
import Link from "next/link";

export function AddressSection() {
  const { data: addresses, isLoading } = useGetUserAddresses();

  const primaryAddress = addresses?.find((addr: any) => addr.isPrimary);

  if (isLoading) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="h-5 md:h-6 w-24 md:w-32 bg-muted animate-pulse rounded-md"></div>
          <div className="h-3 md:h-4 w-40 md:w-48 bg-muted animate-pulse rounded-md mt-2"></div>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-5 w-5 bg-muted animate-pulse rounded-full shrink-0 mt-0.5"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-16 bg-muted animate-pulse rounded-md"></div>
              <div className="h-3 w-full bg-muted animate-pulse rounded-md"></div>
              <div className="h-3 w-24 bg-muted animate-pulse rounded-md"></div>
            </div>
          </div>
          <div className="h-10 w-full bg-muted animate-pulse rounded-md"></div>
        </CardContent>
      </Card>
    );
  }

  const getAddressIcon = (label: string) => {
    const lowerLabel = label?.toLowerCase() || "";
    if (lowerLabel.includes("home") || lowerLabel.includes("rumah")) {
      return <Home className="h-5 w-5 text-blue-600" />;
    } else if (
      lowerLabel.includes("office") ||
      lowerLabel.includes("kantor") ||
      lowerLabel.includes("work")
    ) {
      return <Building2 className="h-5 w-5 text-green-600" />;
    }
    return <MapPin className="h-5 w-5 text-gray-600" />;
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg md:text-xl">My Address</CardTitle>
        <CardDescription className="text-sm md:text-base">
          {primaryAddress
            ? "Your primary delivery address."
            : "You haven't set a primary address yet."}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {primaryAddress ? (
          <>
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                {getAddressIcon(primaryAddress.label)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col space-y-1">
                  <h3 className="font-semibold text-sm md:text-base text-gray-900 uppercase tracking-wide">
                    {primaryAddress.label}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    {primaryAddress.fullAddress}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">
                    Postal Code:{" "}
                    <span className="font-medium text-gray-700">
                      {primaryAddress.postalCode}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-8">
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-gray-400" />
              </div>
              <div className="space-y-1">
                <p className="text-sm md:text-base text-gray-900 font-medium">
                  No primary address found
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  Add an address to get started with deliveries
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-2">
          <Link href="/profile/addresses" className="block">
            <Button className="w-full" size="default">
              <PlusCircle className="h-4 w-4 mr-2" />
              <span>{primaryAddress ? "Manage Addresses" : "Add Address"}</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
