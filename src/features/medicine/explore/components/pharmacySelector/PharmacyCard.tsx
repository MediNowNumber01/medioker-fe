"use client"

import type { Pharmacy } from "@/types/semuaNgerapiinyaNtar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { FC } from "react"

interface PharmacyCardProps {
  className?: string
  pharmacy?: Pharmacy | null
  onClick?: () => void
  fixedLayout?: boolean
  isSelected?: boolean
}

const PharmacyCard: FC<PharmacyCardProps> = ({ className, pharmacy, onClick, fixedLayout, isSelected }) => {
  if (!pharmacy) {
    return (
      <Card className={`border-2 border-dashed border-gray-300 bg-gray-50 ${className}`}>
        <CardContent className="p-6 text-center">
          <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 font-medium">No pharmacy selected</p>
          <p className="text-sm text-gray-500">Click to select a pharmacy</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-md ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"
      } ${className}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className={`flex ${fixedLayout ? "flex-row" : "md:flex-col lg:flex-row"} items-start gap-3`}>
          <div className="flex-shrink-0">
            <Avatar className="h-12 w-12">
              <AvatarImage src={pharmacy.picture || "/placeholder.svg"} alt={pharmacy.name} className="object-cover" />
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
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-gray-900 truncate">{pharmacy.name}</h3>
              {isSelected && (
                <Badge variant="default" className="bg-blue-600 text-white flex-shrink-0">
                  Selected
                </Badge>
              )}
            </div>

            {pharmacy.detailLocation && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{pharmacy.detailLocation}</p>
            )}

            {pharmacy.lat && pharmacy.lng && (
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${pharmacy.lat},${pharmacy.lng}`}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline mt-2"
              >
                <MapPin className="h-3 w-3" />
                View on Map
                <ExternalLink className="h-3 w-3" />
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PharmacyCard
