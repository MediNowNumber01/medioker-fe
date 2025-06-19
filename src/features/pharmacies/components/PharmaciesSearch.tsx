import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  CircleX,
  Search,
} from "lucide-react";
import { FC } from "react";

interface PharmaciesSearchProps {
  className?: string;
  search: string;
  setSearch: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  isOpen: string;
  setIsOpen: (isOpen: string) => void;
}

const PharmaciesSearch: FC<PharmaciesSearchProps> = ({
  className,
  search,
  setSearch,
  sortOrder,
  setSortOrder,
  sortBy,
  setSortBy,
  isOpen,
  setIsOpen,
}) => {
  return (
    <div>
      <div
        className={`${className} flex-col space-y-2 items-center justify-between gap-4`}
      >
        <div className="relative grow w-full md:w-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search Pharmacies"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 text-lg bg-card"
          />
          {search && (
            <CircleX
              className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 color-destructive cursor-pointer"
              onClick={() => setSearch("")}
            />
          )}
        </div>
        <div className=" items-center gap-2 flex justify-between">
          <div className={`block`}>
            <Select value={isOpen} onValueChange={setIsOpen}>
              <SelectTrigger className={`md:w-[120px] bg-card `}>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className={`md:w-[120px] bg-card `}>
                <SelectValue placeholder="sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="name">A-Z</SelectItem>
                  <SelectItem value="createdAt">Newest</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              className="bg-card hover:bg-accent aspect-square border "
              onClick={() => {
                if (sortOrder === "asc") {
                  setSortOrder && setSortOrder("desc");
                } else if (sortOrder === "desc") {
                  setSortOrder && setSortOrder("asc");
                }
              }}
            >
              {sortOrder === "asc" ? (
                <ArrowUpNarrowWide className="h-5 w-5  cursor-pointer text-card-foreground hover:text-card-background" />
              ) : sortOrder === "desc" ? (
                <ArrowDownNarrowWide className="h-5 w-5cursor-pointer text-card-foreground hover:text-card-background" />
              ) : null}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmaciesSearch;
