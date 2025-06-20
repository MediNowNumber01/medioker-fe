import PaginationComponent from "@/components/PaginationComponent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetAdmins from "@/hooks/api/admin/useGetAdmins";
import useAssignEmployee from "@/hooks/api/Pharmacy/assignEmployee";
import { AdminRole } from "@/types/semuaNgerapiinyaNtar";
import { Label } from "@radix-ui/react-dropdown-menu";
import { CircleX, Search } from "lucide-react";
import { FC, useState } from "react";
import { useDebounce } from "use-debounce";

const AssignEmployee: FC<{ pharmacyId: string }> = ({ pharmacyId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [selectedAdmin, setSelectedAdmin] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string>("false");
  const { data: adminData } = useGetAdmins({
    search: debouncedSearch,
    take: 5,
    page: selectedPage,
    role: Object.values(AdminRole).includes(selectedRole as AdminRole)
      ? (selectedRole as AdminRole)
      : undefined,
    status:
      selectedStatus === "true" || selectedStatus === "false"
        ? selectedStatus
        : undefined,
    notOnPharmacy: pharmacyId,
  });
  const { mutateAsync: assignEmployee, isPending } =
    useAssignEmployee(pharmacyId);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAdmin([]);
    setSelectedRole("all");
    setSelectedStatus("false");
    setSelectedPage(1);
  };

  const handleAssign = () => {
    assignEmployee({
      adminId: selectedAdmin,
    });
    handleCloseDialog();
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger className="w-full" asChild>
        <Button onClick={() => setOpenDialog(true)} className="w-full mb-4">
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[95vw] overflow-y-auto sm:w-[80vw] md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Assign New Employee</DialogTitle>
          <DialogDescription>
            Assign a new employee to the pharmacy.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 text-lg bg-card"
            />
            {search && (
              <CircleX
                className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-destructive cursor-pointer"
                onClick={() => setSearch("")}
              />
            )}
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1 space-y-2">
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <Label className="my-0">Select Role</Label>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(AdminRole).map((role) => (
                    <SelectItem key={`assadminrole-${role}`} value={role}>
                      {role
                        .toLowerCase()
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </SelectItem>
                  ))}
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-2">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <Label className="my-0">Select Status</Label>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-fit text-center">Select</TableHead>
                <TableHead className="w-fit md:min-w-[180px]">Admin</TableHead>
                <TableHead className="w-fit md:min-w-[150px]">Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminData?.data?.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="text-center">
                    <Checkbox
                      checked={selectedAdmin.includes(employee.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedAdmin((prev) => [...prev, employee.id]);
                        } else {
                          setSelectedAdmin((prev) =>
                            prev.filter((id) => id !== employee.id)
                          );
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 items-center">
                      <div>
                        <Avatar className="h-10 w-10">
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
                      <div className="flex flex-col">
                        <h4 className="font-medium">
                          {employee.account.fullName}
                        </h4>
                        <p className="text-sm text-muted-foreground break-all">
                          {employee.account.email}
                        </p>
                        <p className="text-xs text-muted-foreground">{`ID: ${employee.id}`}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">
                    {employee.adminRole.replace(/_/g, " ").toLowerCase()}
                  </TableCell>
                </TableRow>
              ))}
              {adminData?.meta?.total === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No employees found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div>
          {adminData?.meta.total !== undefined  && (
            <p className="text-sm text-center text-muted-foreground mt-2">
              Total: {adminData.meta.total} employees found.
            </p>
          )}
        </div>
        <PaginationComponent
          paginationMeta={adminData?.meta}
          onPageChange={setSelectedPage}
          numberNarest={0}
        />

        <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button
              onClick={handleCloseDialog}
              disabled={isPending}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="default"
            disabled={!selectedAdmin.length || isPending}
            onClick={handleAssign}
            className="w-full sm:w-auto"
          >
            {isPending ? "Assigning..." : "Assign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignEmployee;
