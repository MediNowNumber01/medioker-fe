import { PaginationMeta } from "@/app/types/search/response/PaginationResponse";
import { Pharmacy } from "@/app/types/semuaNgerapiinyaNtar";
import PaginationComponent from "@/components/PaginationComponent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { FC } from "react";
import PharmaciesSearch from "./PharmaciesSearch";
interface PharmaciesListProps {
  search: string;
  setSearch: (search: string) => void;
  paginationMeta?: PaginationMeta;
  onPageChange: (page: number) => void;
  pharmacies?: Pharmacy[];
  isLoading?: boolean;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortOrder: string;
  setSortOrder: (sortOrder: string) => void;
  isOpen: string | undefined;
  setIsOpen: (isOpen: string | undefined) => void;
}
const PharmaciesList: FC<PharmaciesListProps> = ({
  search,
  setSearch,
  paginationMeta,
  onPageChange,
  pharmacies,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Card>
      <CardHeader>
        <PharmaciesSearch
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-auto">
          <Table>
            <TableCaption>
              {`total : ${paginationMeta?.total} pharmacies`}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[100px]">Pharmacy</TableHead>
                <TableHead className="w-[100px]">status</TableHead>
                <TableHead className="min-w-[300px] whitespace-break-spaces ">
                  details location
                </TableHead>
                <TableHead className="w-[100px]">Admin</TableHead>
                <TableHead className="w-[100px]">Detail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pharmacies?.map((pharmacy) => (
                <TableRow key={pharmacy.id} className="justify-center h-full">
                  <TableCell>
                    <div className="flex gap-2 relative">
                      <Avatar className="w-10 h-10  aspect-square overflow-clip">
                        <AvatarImage
                          src={pharmacy.picture}
                          alt={pharmacy.name}
                        />
                        <AvatarFallback>
                          {pharmacy.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid">
                        {pharmacy.name}
                        <span className="text-sm text-muted-foreground">
                          {pharmacy.id}
                        </span>
                      </div>

                      {pharmacy.isMain && (
                        <Badge
                          variant="outline"
                          className="absolute top-1/2 right-0 -translate-y-1/2"
                        >
                          Main
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="  h-full">
                    <Badge
                      className={
                        pharmacy.isOpen
                          ? "bg-green-600 text-white "
                          : "bg-red-500 text-white "
                      }
                    >
                      {pharmacy.isOpen ? "Open" : "Closed"}
                    </Badge>
                  </TableCell>
                  <TableCell className="min-w-[300px] whitespace-break-spaces ">
                    {pharmacy.detailLocation}
                  </TableCell>
                  <TableCell>{pharmacy._count?.Admin || 0}</TableCell>
                  <TableCell>
                    <Eye />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <CardFooter>
          <PaginationComponent
            paginationMeta={paginationMeta}
            onPageChange={onPageChange}
          />
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default PharmaciesList;
