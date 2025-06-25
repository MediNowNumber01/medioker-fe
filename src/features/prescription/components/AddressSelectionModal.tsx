"use client";

import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { UserAddress } from "@/types/userAddress";
import { Building2, Home, MapPin, Plus } from "lucide-react";
import { useState } from "react";
import { AddressForm } from "../../profile/addresses/components/AddressForm";

interface AddressSelectionModalProps {
  onAddressSelect: (addressId: string) => void;
  currentAddressId: string;
  onClose: () => void;
}

const getAddressIcon = (label: string) => {
  const lowerLabel = label?.toLowerCase() || "";
  if (lowerLabel.includes("home") || lowerLabel.includes("rumah"))
    return <Home className="h-5 w-5 text-blue-600" />;
  if (lowerLabel.includes("office") || lowerLabel.includes("kantor"))
    return <Building2 className="h-5 w-5 text-green-600" />;
  return <MapPin className="h-5 w-5 text-gray-600" />;
};

export function AddressSelectionModal({
  onAddressSelect,
  currentAddressId,
  onClose,
}: AddressSelectionModalProps) {
  const { data: addresses, isLoading, refetch } = useGetUserAddresses();
  const [selectedValue, setSelectedValue] = useState(currentAddressId);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleConfirm = () => {
    onAddressSelect(selectedValue);
    onClose();
  };

  return (
    <div>
      <RadioGroup
        value={selectedValue}
        onValueChange={setSelectedValue}
        className="space-y-3"
      >
        {isLoading && <p>Loading addresses...</p>}
        {addresses?.map((addr: UserAddress) => (
          <Label
            key={addr.id}
            htmlFor={`addr-${addr.id}`}
            className={cn(
              "flex items-start gap-4 border rounded-lg p-4 cursor-pointer transition-colors hover:bg-accent/50",
              selectedValue === addr.id &&
                "border-primary ring-2 ring-primary/50"
            )}
          >
            <RadioGroupItem
              value={addr.id}
              id={`addr-${addr.id}`}
              className="mt-1"
            />
            <div className="flex items-start gap-3 flex-1">
              <div className="mt-1">{getAddressIcon(addr.label)}</div>
              <div className="flex-1">
                <p className="font-semibold">{addr.label}</p>
                <p className="text-sm text-muted-foreground">
                  {addr.fullAddress}
                </p>
                <p className="text-xs text-muted-foreground">
                  Postal Code: {addr.postalCode}
                </p>
              </div>
            </div>
          </Label>
        ))}
      </RadioGroup>

      <div className="mt-6 pt-6 border-t flex flex-col sm:flex-row gap-2 justify-between">
        <Button onClick={handleConfirm} disabled={!selectedValue}>
          Confirm Selection
        </Button>
      </div>
    </div>
  );
}
