import { PaginationMeta } from "@/types/search/response/PaginationResponse";
import { FC } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import SearchBar from "@/components/SearchBar";
import { Category } from "@/types/semuaNgerapiinyaNtar";
import PaginationComponent from "@/components/PaginationComponent";
import EditCategory from "./EditCategory/EditCategory";
import DeleteCategory from "./DeleteCategory";
import MobileOrder from "./MobileOrder";
interface CategoriesListProps {
  search: string;
  setSearch: (search: string) => void;
  paginationMeta?: PaginationMeta;
  onPageChange: (page: number) => void;
  categories?: Category[];
  isLoading?: boolean;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortOrder: string;
  setSortOrder: (sortOrder: string) => void;
}
const CategoriesList: FC<CategoriesListProps> = ({
  search,
  setSearch,
  paginationMeta,
  onPageChange,
  categories,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <Card>
      <CardHeader>
        List Category
        <SearchBar
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        <MobileOrder
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-auto">
          <Table>
            <TableCaption>
              {`total : ${paginationMeta?.total} Categories`}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>id</TableHead>
                <TableHead>name</TableHead>
                <TableHead className="w-[300px]">description</TableHead>
                <TableHead className="">products</TableHead>
                <TableHead className="w-[100px]">edit</TableHead>
                <TableHead className="w-[100px]">delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className=" whitespace-break-spaces line-clamp-3">
                    {category.description}
                  </TableCell>
                  <TableCell>{category._count?.ProductCategory || 0}</TableCell>
                  <TableCell>
                    <div className="hover:cursor-pointer">
                      <EditCategory category={category} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <DeleteCategory id={category.id} />
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

export default CategoriesList;
