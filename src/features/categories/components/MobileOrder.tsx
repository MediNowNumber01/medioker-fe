import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import { FC } from "react";

interface MobileOrderProps {
  sortBy: string;
  setSortBy?: (sortBy: string) => void;
  sortOrder: string;
  setSortOrder?: (sortOrder: string) => void;
}
const MobileOrder: FC<MobileOrderProps> = ({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="  gap-2 flex md:hidden items-center">
      <div className="text-muted-foreground text-sm">Order By :</div>
      <div className={`${setSortBy ? "block" : "hidden"} grow`}>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className={`w-full bg-card `}>
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
  );
};

export default MobileOrder;
