"use client"

import { Acquisition, Golongan } from "@/types/semuaNgerapiinyaNtar"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import useGetCategories from "@/hooks/api/Category/useGetCategories"
import { cn } from "@/lib/utils"
import { DialogDescription } from "@radix-ui/react-dialog"
import { Check, Filter, X } from "lucide-react"
import { type FC, useState } from "react"

interface MobileFilterProps {
  className?: string
  selectedGolongan: string | undefined | null
  selectedAquisition: string | undefined | null
  selectedCategories: string[]
  onGolonganChange: (golongan: string) => void
  onAcquisitionChange: (acquisition: string) => void
  onCategoryChange: (category: string[]) => void
  sortOrder: string
  setSortOrder: (value: string) => void
  sortBy: string
  setSortBy: (value: string) => void
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
  const [open, setOpen] = useState(false)
  const { data: categories } = useGetCategories({
    sortBy: "name",
    sortOrder: "asc",
    all: true,
  })

  const activeFiltersCount = [
    selectedAquisition,
    selectedGolongan,
    selectedCategories.length > 0 ? "categories" : null,
  ].filter(Boolean).length

  return (
    <div className="md:hidden w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full bg-transparent" variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Search
            </DialogTitle>
            <DialogDescription>Use the options below to filter your search results.</DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-4">
            {/* Clear Filters Button */}
            <Button
              variant="outline"
              disabled={activeFiltersCount === 0}
              className="w-full bg-transparent"
              onClick={() => {
                setSortBy("name")
                setSortOrder("asc")
                onAcquisitionChange("")
                onGolonganChange("")
                onCategoryChange([])
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Reset All Filters
            </Button>

            {/* Golongan Filter */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Golongan</span>
                {selectedGolongan && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Selected
                  </Badge>
                )}
              </div>
              <Select value={selectedGolongan || "all"} onValueChange={onGolonganChange}>
                <SelectTrigger className="w-full bg-card">
                  <SelectValue placeholder="Select Golongan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Golongan</SelectItem>
                  {Object.values(Golongan).map((golongan) => (
                    <SelectItem key={golongan} value={golongan}>
                      {golongan
                        .split("_")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(" ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Acquisition Filter */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Acquisition</span>
                {selectedAquisition && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Selected
                  </Badge>
                )}
              </div>
              <Select value={selectedAquisition || "all"} onValueChange={onAcquisitionChange}>
                <SelectTrigger className="w-full bg-card">
                  <SelectValue placeholder="Select Acquisition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Acquisition</SelectItem>
                  {Object.values(Acquisition).map((acquisition) => (
                    <SelectItem key={acquisition} value={acquisition}>
                      {acquisition
                        .split("_")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(" ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Category</span>
                {selectedCategories.length > 0 && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {selectedCategories.length} selected
                  </Badge>
                )}
              </div>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between text-muted-foreground font-normal bg-card"
                  >
                    {selectedCategories.length > 0
                      ? `${selectedCategories.length} categories selected`
                      : "Select categories..."}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categories?.data.map((category) => (
                          <CommandItem
                            key={category.id}
                            value={category.name}
                            onSelect={() => {
                              onCategoryChange([category.id])
                            }}
                          >
                            {category.name}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                selectedCategories.includes(category.id) ? "opacity-100" : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <span className="text-sm font-medium">Sort By</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full bg-card">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="createdAt">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <span className="text-sm font-medium">Sort Order</span>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-full bg-card">
                  <SelectValue placeholder="Sort Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex-shrink-0">
            <DialogClose asChild>
              <Button variant={activeFiltersCount > 0 ? "default" : "outline"} className="w-full">
                Apply Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="bg-white/20 text-white ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MobileFilter
