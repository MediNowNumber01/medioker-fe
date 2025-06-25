"use client";

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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useGetUserAddresses from "@/hooks/api/address/useGetUserAddresses";
import useUpdatePrimaryAddress from "@/hooks/api/address/useUpdatePrimaryAddress";
import { cn } from "@/lib/utils";
import type { UserAddress } from "@/types/userAddress";
import {
  Building2,
  Home,
  MapPin,
  Plus,
  Star,
  Check,
  ArrowLeft,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { AddressForm } from "./components/AddressForm";

export default function AddressPage() {
  const { data: addresses, isLoading, refetch } = useGetUserAddresses();
  const { mutate: setPrimary, isPending: isUpdating } =
    useUpdatePrimaryAddress();

  const [selectedPrimary, setSelectedPrimary] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (addresses) {
      const primaryId =
        addresses.find((a: UserAddress) => a.isPrimary)?.id || "";
      setSelectedPrimary(primaryId);
    }
  }, [addresses]);

  const handleSavePrimaryAddress = () => {
    if (!selectedPrimary) {
      toast.error("Please select a primary address.");
      return;
    }
    setPrimary(selectedPrimary, {
      onSuccess: () => {
        toast.success("Primary address updated!");
        refetch();
      },
    });
  };

  const getAddressIcon = (label: string) => {
    const lowerLabel = label?.toLowerCase() || "";
    if (lowerLabel.includes("home") || lowerLabel.includes("rumah")) {
      return <Home className="h-4 w-4 text-blue-600" />;
    } else if (
      lowerLabel.includes("office") ||
      lowerLabel.includes("kantor") ||
      lowerLabel.includes("work")
    ) {
      return <Building2 className="h-4 w-4 text-green-600" />;
    }
    return <MapPin className="h-4 w-4 text-gray-600" />;
  };

  const currentPrimaryId = addresses?.find((a: any) => a.isPrimary)?.id;
  const hasChanges = selectedPrimary !== currentPrimaryId;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/50">
        <div className="container mx-auto max-w-4xl py-4 md:py-8 px-4 space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-9 w-32 bg-muted animate-pulse rounded-md"></div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="space-y-2">
              <div className="h-6 md:h-8 w-48 md:w-64 bg-muted animate-pulse rounded-md"></div>
              <div className="h-4 w-64 md:w-80 bg-muted animate-pulse rounded-md"></div>
            </div>
            <div className="h-9 md:h-10 w-full md:w-40 bg-muted animate-pulse rounded-md"></div>
          </div>

          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <div className="h-5 md:h-6 w-32 md:w-40 bg-muted animate-pulse rounded-md"></div>
              <div className="h-4 w-full md:w-96 bg-muted animate-pulse rounded-md mt-2"></div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 border rounded-lg p-4"
                >
                  <div className="h-4 w-4 bg-muted animate-pulse rounded-full shrink-0 mt-0.5"></div>
                  <div className="h-4 w-4 bg-muted animate-pulse rounded shrink-0 mt-0.5"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-20 bg-muted animate-pulse rounded-md"></div>
                    <div className="h-3 w-full bg-muted animate-pulse rounded-md"></div>
                    <div className="h-3 w-24 bg-muted animate-pulse rounded-md"></div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-4 border-t">
                <div className="h-9 w-40 bg-muted animate-pulse rounded-md"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto max-w-4xl py-4 md:py-8 px-4 space-y-6">
        <div className="flex items-center gap-4 mb-2">
          <Link href="/profile">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden md:inline">Back to Profile</span>
              <span className="md:hidden">Back</span>
            </Button>
          </Link>
          <div className="h-4 w-px bg-border"></div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Profile</span>
            <span>/</span>
            <span className="text-foreground font-medium">Addresses</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Manage My Addresses
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Add and manage your delivery addresses
            </p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add New Address
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
              <DialogHeader>
                <DialogTitle>Add a New Address</DialogTitle>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto">
                <AddressForm
                  onSuccess={() => {
                    refetch();
                    setIsModalOpen(false);
                  }}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {addresses && addresses.length > 0 && (
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Your Addresses
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({addresses.length}{" "}
                  {addresses.length === 1 ? "address" : "addresses"})
                </span>
              </CardTitle>
              <CardDescription className="text-sm md:text-base">
                Select one address to be your primary delivery location.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <RadioGroup
                value={selectedPrimary}
                onValueChange={setSelectedPrimary}
              >
                <div className="space-y-3">
                  {addresses.map((addr: UserAddress) => (
                    <Label
                      key={addr.id}
                      htmlFor={addr.id}
                      className={cn(
                        "flex items-start gap-3 border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:bg-accent/30 hover:border-primary/30",
                        selectedPrimary === addr.id &&
                          "border-primary bg-primary/5 ring-1 ring-primary/20 shadow-sm"
                      )}
                    >
                      <RadioGroupItem
                        value={addr.id}
                        id={addr.id}
                        className="mt-1 shrink-0"
                      />

                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="shrink-0 mt-0.5">
                          {getAddressIcon(addr.label)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-sm md:text-base text-gray-900 uppercase tracking-wide">
                                {addr.label}
                              </p>
                              {addr.isPrimary && (
                                <div className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                                  <Star className="h-3 w-3 fill-current" />
                                  <span className="text-xs font-medium">
                                    Primary
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-1">
                            {addr.fullAddress}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Postal Code:{" "}
                            <span className="font-medium text-gray-700">
                              {addr.postalCode}
                            </span>
                          </p>
                        </div>
                      </div>
                    </Label>
                  ))}
                </div>
              </RadioGroup>

              <div className="flex flex-col md:flex-row gap-3 md:justify-between mt-6 pt-4 border-t">
                <Link href="/profile">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full md:w-auto"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Profile
                  </Button>
                </Link>
                <Button
                  onClick={handleSavePrimaryAddress}
                  disabled={isUpdating || !hasChanges}
                  className="w-full md:w-auto"
                  size="sm"
                >
                  {isUpdating ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Saving...
                    </>
                  ) : hasChanges ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Save Primary Address
                    </>
                  ) : (
                    "No Changes"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {!isLoading && (!addresses || addresses.length === 0) && (
          <Card className="shadow-sm">
            <CardContent className="py-16">
              <div className="text-center space-y-6">
                <div className="mx-auto h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                    No addresses yet
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
                    You haven't added any addresses yet. Add your first address
                    to get started with deliveries and enjoy seamless shopping
                    experience.
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Address
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
                      <DialogHeader>
                        <DialogTitle>Add a New Address</DialogTitle>
                      </DialogHeader>
                      <div className="flex-1 overflow-y-auto">
                        <AddressForm
                          onSuccess={() => {
                            refetch();
                            setIsModalOpen(false);
                          }}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Link href="/profile">
                    <Button variant="outline" size="sm">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
