"use client";

import PaginationComponent from "@/components/PaginationComponent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetPharmacyEmployee from "@/hooks/api/Pharmacy/useGetPharmacyEmployee";
import { CircleX, Search } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { FC } from "react";
import { useDebounce } from "use-debounce";
import AssignEmployee from "./AssignEmployee";
import UnassignEmployee from "./UnassignEmployee";

interface PharmacyEmployeeProps {
  pharmacyId: string;
}
const PharmacyEmployee: FC<PharmacyEmployeeProps> = ({ pharmacyId }) => {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
  });
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "asc",
  });
  const [debouncedSearch] = useDebounce(search, 500);
  const { data: employee } = useGetPharmacyEmployee(pharmacyId, {
    search: debouncedSearch ? debouncedSearch : undefined,
    page,
    sortOrder,
    take: 10,
  });
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Pharmacy Employees</h3>
        <p className="text-muted-foreground">
          Manage your pharmacy employees effectively
        </p>
      </CardHeader>
      <div className="p-4">
        <AssignEmployee pharmacyId={pharmacyId} />
        <div className="relative grow w-full md:w-full  ">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search employees..."
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
      </div>
      <CardContent>
        <div className="border rounded-md">
          <Table>
            <TableCaption>
              {`total : ${employee?.meta?.total} Employees`}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Admin</TableHead>
                <TableHead className="w-[300px]">Role</TableHead>
                <TableHead className="w-[100px]">Unassigned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employee?.data?.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex gap-2 items-center">
                      <div>
                        <Avatar className="w-15 h-15 ">
                          <AvatarImage
                            src={employee.account.profilePict || ""}
                            alt={employee.account.fullName}
                          />
                          <AvatarFallback>
                            {employee.account.fullName
                              .split(" ")
                              .map((name) => name[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <h4>{employee.account.fullName}</h4>
                        <p>{employee.account.email}</p>
                        <p className="text-muted-foreground">{`id: ${employee.id}`}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {employee.adminRole
                      .split("_")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      .join(" ")}
                  </TableCell>
                  <TableCell>
                    <UnassignEmployee employeeId={employee.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <PaginationComponent
            paginationMeta={employee?.meta}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PharmacyEmployee;
