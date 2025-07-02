"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Pharmacy } from "@/types/semuaNgerapiinyaNtar";
import { Building, ChevronsUpDown, MapPin, Star } from "lucide-react";
import type { FC } from "react";

interface PrescriptionPharmacyCardProps {
  pharmacy: PharmacyWithDistance | null;
  isLoading?: boolean;
  isNearest?: boolean;
  isMain?: boolean;
  isModalTrigger?: boolean;
}

type PharmacyWithDistance = Pharmacy & { distance?: number };
export const PrescriptionPharmacyCard: FC<PrescriptionPharmacyCardProps> = ({
  pharmacy,
  isLoading,
  isNearest,
  isMain,
  isModalTrigger,
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!pharmacy) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Select pharmacy</p>
            </div>
            {isModalTrigger && (
              <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
              <MapPin className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium">{pharmacy.name}</p>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {pharmacy.detailLocation}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isNearest && (
              <Badge
                variant="outline"
                className="text-green-700 border-green-300 bg-green-50"
              >
                <Star className="h-3 w-3 mr-1" />
                Nearest
              </Badge>
            )}
            {isMain && (
              <Badge
                variant="outline"
                className="text-purple-700 border-purple-300 bg-purple-50"
              >
                <Building className="h-3 w-3 mr-1" />
                Center
              </Badge>
            )}
            {isModalTrigger && (
              <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
