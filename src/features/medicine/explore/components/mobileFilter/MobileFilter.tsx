"use client";
import { Acquisition, Golongan } from "@/app/types/semuaNgerapiinyaNtar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetCategories from "@/hooks/api/Category/useGetCategories";
import { cn } from "@/lib/utils";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Check, X } from "lucide-react";
import { FC, useState } from "react";

interface MobileFilterProps {
  className?: string;
  selectedGolongan: string | undefined | null;
  selectedAquisition: string | undefined | null;
  selectedCategories: string[];
  onGolonganChange: (golongan: string) => void;
  onAcquisitionChange: (catCreate: string) => void;
  onCategoryChange: (category: string[]) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

const MobileFilter: FC<MobileFilterProps> = ({
  className,
  selectedGolongan,
  selectedAquisition,
  selectedCategories,
  onGolonganChange,
  onAcquisitionChange,
  onCategoryChange,
  sortOrder,
  setSortOrder,
  sortBy,
  setSortBy,
}) => {
  const [open, setOpen] = useState(false);
  const { data: categories } = useGetCategories({
    sortBy: "name",
    sortOrder: "asc",
    all: true,
  });
  return (
    <div className="md:hidden w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full my-2" variant="default">
            Filter
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle>Filter Search</DialogTitle>
            <DialogDescription>
              Use the options below to filter your search results.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Button
              variant="outline"
              disabled={
                !selectedAquisition &&
                !selectedGolongan &&
                selectedCategories.length === 0
              }
              className={`w-full my-2 ${className}`}
              onClick={() => {
                setSortBy("name");
                setSortOrder("asc");
                onAcquisitionChange("");
                onGolonganChange("");
                onCategoryChange(selectedCategories);
              }}
            >
              Reset Filters
            </Button>
            <Select
              value={selectedGolongan ? selectedGolongan : ""}
              onValueChange={onGolonganChange}
            >
              <div className="mb-2 text-sm">Golongan</div>
              <SelectTrigger className="w-full mb-2 bg-card">
                <SelectValue placeholder="Select Golongan" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Golongan).map((golongan) => (
                  <SelectItem key={`mobile-${golongan}`} value={golongan}>
                    {golongan
                      .split("_")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      .join(" ")}
                  </SelectItem>
                ))}
                <SelectItem value="all" onClick={() => onGolonganChange("")}>
                  all
                </SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={selectedAquisition ? selectedAquisition : ""}
              onValueChange={onAcquisitionChange}
            >
              <div className="mb-2 text-sm">Acquisition</div>
              <SelectTrigger className="w-full mb-2 bg-card">
                <SelectValue placeholder="Select Acquisition" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Acquisition).map((acquisition) => (
                  <SelectItem key={`mobile-${acquisition}`} value={acquisition}>
                    {acquisition
                      .split("_")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      .join(" ")}
                  </SelectItem>
                ))}
                <SelectItem value="all" onClick={() => onGolonganChange("")}>
                  all
                </SelectItem>
              </SelectContent>
            </Select>

            {/* category */}
            <div className="mb-2 text-sm">Category</div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between text-muted-foreground font-normal bg-card mb-2"
                >
                  {selectedCategories.length > 0
                    ? selectedCategories.join(", ")
                    : "Select category..."}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Command className="w-full relative z-20">
                  <CommandInput placeholder="Search category..." />
                  <CommandList className="overflow-clip">
                    <CommandEmpty>No category found.</CommandEmpty>
                    {categories?.data.map((category) => (
                      <CommandItem
                        key={category.id}
                        value={category.name}
                        onSelect={() => {
                          onCategoryChange([category.id]);
                        }}
                      >
                        {category.name}
                        <Check
                          className={cn(
                            "ml-auto",
                            selectedCategories.includes(category.id)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Select value={sortBy ? sortBy : ""} onValueChange={setSortBy}>
              <div className="mb-2 text-sm">Sort By</div>
              <SelectTrigger className="w-full mb-4 bg-card">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="createdAt">Newest</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={sortOrder ? sortOrder : ""}
              onValueChange={setSortOrder}
            >
              <div className="mb-2 text-sm">Sort Order</div>
              <SelectTrigger className="w-full mb-4 bg-card">
                <SelectValue placeholder="Sort Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant={
                  selectedAquisition ||
                  selectedGolongan ||
                  selectedCategories.length > 0
                    ? "default"
                    : "outline"
                }
              >
                Apply
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MobileFilter;
