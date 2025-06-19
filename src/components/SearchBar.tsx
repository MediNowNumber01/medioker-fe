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

interface SearchBarProps {
  className?: string;
  search: string;
  setSearch: (value: string) => void;
  sortOrder?: string;
  setSortOrder?: (value: string) => void;
  sortBy?: string;
  setSortBy?: (value: string) => void;
  placeholder?: string;
}

const SearchBar: FC<SearchBarProps> = ({
  className,
  search,
  setSearch,
  sortOrder,
  setSortOrder,
  sortBy,
  setSortBy,
  placeholder = "Search",
}) => {
  return (
    <div>
      <div className={`${className} flex items-center justify-between gap-4`}>
        <div className="relative grow w-full md:w-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder={placeholder}
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
        <div className=" items-center gap-2 hidden md:flex">
          <div className={`${setSortBy ? "block" : "hidden"}`}>
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
          </div>
          <Button
            className={`bg-card hover:bg-accent aspect-square ${
              setSortOrder ? "block" : "hidden"
            }`}
            onClick={() => {
              if (sortOrder === "asc") {
                setSortOrder && setSortOrder("desc");
              } else if (sortOrder === "desc") {
                setSortOrder && setSortOrder("asc");
              }
            }}
          >
            {sortOrder === "asc" ? (
              <ArrowUpNarrowWide className="h-5 w-5 cursor-pointer text-card-foreground hover:text-card-background" />
            ) : sortOrder === "desc" ? (
              <ArrowDownNarrowWide className="h-5 w-5 cursor-pointer text-card-foreground hover:text-card-background" />
            ) : null}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
