"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Pharmacy } from "@/types/semuaNgerapiinyaNtar";
import {
  Building,
  CheckCircle,
  ExternalLink,
  MapPin,
  Route,
  Star,
} from "lucide-react";
import Link from "next/link";
import type { FC } from "react";

type SelectionReason = "nearest" | "main" | null;

interface PharmacyCardProps {
  className?: string;
  pharmacy?: Pharmacy | null;
  onClick?: () => void;
  fixedLayout?: boolean;
  isSelected?: boolean;
  distance?: number;
  isMain?: boolean;
  isNearest?: boolean;
}

const PharmacyCard: FC<PharmacyCardProps> = ({
  className,
  pharmacy,
  onClick,
  fixedLayout,
  isSelected,
  distance,
  isMain,
  isNearest,
}) => {
  if (!pharmacy) {
    return (
      <Card
        onClick={onClick}
        className={`border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all ${className}`}
      >
        <CardContent className="p-6 text-center">
          <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 font-medium">No pharmacy selected</p>
          <p className="text-sm text-gray-500">Click to select a pharmacy</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-md cursor-pointer ${
        isSelected
          ? "border-blue-500 ring-2 ring-blue-500/50 bg-blue-50/50"
          : "border-gray-200"
      } ${className}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div
          className={`flex ${
            fixedLayout ? "flex-row" : "md:flex-col lg:flex-row"
          } items-start gap-3`}
        >
          <div className="flex-shrink-0">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={pharmacy.picture || "/placeholder.svg"}
                alt={pharmacy.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {pharmacy.name
                  ? pharmacy.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)
                  : "PH"}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate mb-1.5">
              {pharmacy.name}
            </h3>

            <div className="flex items-center flex-wrap gap-2">
              {isSelected && (
                <Badge
                  variant="default"
                  className="bg-blue-600 text-white flex-shrink-0"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Selected
                </Badge>
              )}
              {isNearest && (
                <Badge
                  variant="outline"
                  className="text-green-700 border-green-300 bg-green-50 flex-shrink-0"
                >
                  <Star className="h-3 w-3 mr-1" />
                  Nearest
                </Badge>
              )}
              {isMain && (
                <Badge
                  variant="outline"
                  className="text-purple-700 border-purple-300 bg-purple-50 flex-shrink-0"
                >
                  <Building className="h-3 w-3 mr-1" />
                  Center
                </Badge>
              )}
            </div>

            {pharmacy.detailLocation && (
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {pharmacy.detailLocation}
              </p>
            )}

            <div className="flex items-center gap-4 mt-2">
              {pharmacy.lat && pharmacy.lng && (
                <Link
                  href={`https://www.google.com/maps?q=${pharmacy.lat},${pharmacy.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline"
                >
                  <MapPin className="h-3 w-3" />
                  View Map
                  <ExternalLink className="h-3 w-3" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      {distance !== undefined && (
        <div className="inline-flex items-center gap-1 px-4 text-xs text-gray-700">
          <Route className="h-3 w-3 text-gray-500" />
          <span>{distance.toFixed(1)} km away</span>
        </div>
      )}
    </Card>
  );
};

export default PharmacyCard;
