"use client";

import {
  Acquisition,
  Golongan,
  type Pharmacy,
} from "@/types/semuaNgerapiinyaNtar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";
import { useState, type FC } from "react";
import PharmacySelector from "../pharmacySelector/PharmacySelector";
import useGetCategories from "@/hooks/api/Category/useGetCategories";

interface SideFilterProps {
  className?: string;
  selectedGolongan: string | undefined | null;
  selectedAquisition: string | undefined | null;
  selectedCategories: string[];
  onGolonganChange: (golongan: string) => void;
  onAcquisitionChange: (acquisition: string) => void;
  onCategoryChange: (category: string[]) => void;
  sleectedPharmacy: Pharmacy | null;
  onPharmacyChange: (pharmacy: string) => void;
  userLocation: { lat: number; lng: number } | null;
  selectionReason: SelectionReason;
}

type SelectionReason = "nearest" | "main" | null;
const SideFilter: FC<SideFilterProps> = ({
  className,
  selectedGolongan,
  selectedAquisition,
  onGolonganChange,
  onAcquisitionChange,
  onCategoryChange,
  selectedCategories = [],
  sleectedPharmacy,
  onPharmacyChange,
  userLocation,
  selectionReason,
}) => {
  const { data: categories } = useGetCategories({
    sortBy: "name",
    sortOrder: "asc",
    all: true,
  });

  const hasActiveFilters =
    selectedAquisition || selectedGolongan || selectedCategories.length > 0;

  return (
    <div className={`space-y-6 ${className}`}>
      <PharmacySelector
        pharmacy={sleectedPharmacy}
        setPharmacy={onPharmacyChange}
        userLocation={userLocation}
         selectionReason={selectionReason}
      />

      <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5 text-blue-600" />
            <span>Filters</span>
            {hasActiveFilters && (
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 ml-auto"
              >
                Active
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="outline"
            disabled={!hasActiveFilters}
            size="sm"
            onClick={() => {
              onGolonganChange("");
              onAcquisitionChange("");
              onCategoryChange([]);
            }}
            className="w-full"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All Filters
          </Button>
        </CardHeader>

        <CardContent className="pt-0">
          <Accordion
            type="multiple"
            defaultValue={["acquisition", "golongan", "categories"]}
          >
            <AccordionItem
              value="acquisition"
              className="border rounded-lg mb-4"
            >
              <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline">
                <div className="flex items-center gap-2">
                  <span>Acquisition</span>
                  {selectedAquisition && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      1
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3">
                  {Object.values(Acquisition).map((aqu, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`acquisition-${aqu}`}
                        checked={selectedAquisition === aqu}
                        onCheckedChange={(checked) =>
                          onAcquisitionChange(checked ? aqu : "")
                        }
                      />
                      <Label
                        htmlFor={`acquisition-${aqu}`}
                        className="text-sm font-normal cursor-pointer flex-1"
                      >
                        {aqu
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join(" ")}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="golongan" className="border rounded-lg mb-4">
              <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline">
                <div className="flex items-center gap-2">
                  <span>Group Category</span>
                  {selectedGolongan && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      1
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3">
                  {Object.values(Golongan).map((group, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`golongan-${group}`}
                        checked={selectedGolongan === group}
                        onCheckedChange={(checked) =>
                          onGolonganChange(checked ? group : "")
                        }
                      />
                      <Label
                        htmlFor={`golongan-${group}`}
                        className="text-sm font-normal cursor-pointer flex-1"
                      >
                        {group
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join(" ") === "Obat Terbatas"
                          ? "Restricted Medicine"
                          : group === "OBAT_KERAS"
                          ? "Hard Medicine"
                          : "Over-the-Counter Medicine"}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="categories" className="border rounded-lg">
              <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline">
                <div className="flex items-center gap-2">
                  <span>Other Category</span>
                  {selectedCategories.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      {selectedCategories.length}
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {categories?.data.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => onCategoryChange([category.id])}
                      />
                      <Label
                        htmlFor={`category-${category.id}`}
                        className="text-sm font-normal cursor-pointer flex-1"
                      >
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default SideFilter;
