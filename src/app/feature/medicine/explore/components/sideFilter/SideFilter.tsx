"use client";
import { Acquisition, Golongan } from "@/app/types/semuaNgerapiinyaNtar";
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
import { Filter } from "lucide-react";
import { FC } from "react";
import PharmacySelector from "../pharmacySelector/PharmacySelector";
import useGetCategories from "@/app/hooks/api/Category/useGetCategories";

interface SideFilterProps {
  className?: string;
  selectedGolongan: string | undefined | null;
  selectedAquisition: string | undefined | null;
  selectedCategories: string[];
  onGolonganChange: (golongan: string) => void;
  onAcquisitionChange: (catCreate: string) => void;
  onCategoryChange: (category: string[]) => void;
}

const SideFilter: FC<SideFilterProps> = ({
  className,
  selectedGolongan,
  selectedAquisition,
  onGolonganChange,
  onAcquisitionChange,
  onCategoryChange,
  selectedCategories = [],
}) => {
  const { data: categories } = useGetCategories({
    sortBy: "name",
    sortOrder: "asc",
    all: true,
  });

  return (
    <div className={`${className}`}>
      <PharmacySelector className="mb-4" />
      <Card className="px-4 gap-4">
        <CardHeader className="p-0 hidden  space-y-2 md:block ">
          <CardTitle className="flex items-center gap-2 text-[1.25rem]">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <Button
            variant="default"
            disabled={
              !selectedAquisition &&
              !selectedGolongan &&
              selectedCategories.length === 0
            }
            size="sm"
            onClick={() => {
              onGolonganChange("");
              onAcquisitionChange("");
              onCategoryChange(selectedCategories);
            }}
            className="w-full"
          >
            Clear All Filters
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Accordion type="single" collapsible defaultValue="catCreate">
            <AccordionItem value="catCreate">
              <AccordionTrigger className="text-sm font-medium">
                Acquisition (Jenis Akusisi)
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {Object.values(Acquisition).map((aqu, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`catCreate-${aqu}`}
                        checked={selectedAquisition === aqu}
                        onCheckedChange={(checked) =>
                          onAcquisitionChange(checked ? aqu : "")
                        }
                      />
                      <Label
                        htmlFor={`catCreate-${aqu}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {aqu
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join("")}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible defaultValue="golongan">
            <AccordionItem value="golongan">
              <AccordionTrigger className="text-sm font-medium">
                Group Category (Golongan)
              </AccordionTrigger>
              <AccordionContent>
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
                        className="text-sm font-normal cursor-pointer"
                      >
                        {group
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
          </Accordion>
          <Accordion type="single" collapsible defaultValue="otherCategory">
            <AccordionItem value="otherCategory">
              <AccordionTrigger className="text-sm font-medium">
                Other Category (Kategori Lainnya)
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 ">
                  {categories?.data.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`catCreate-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => onCategoryChange([category.id])}
                      />
                      <Label
                        htmlFor={`catCreate-${category.id}`}
                        className="text-sm font-normal cursor-pointer"
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
