"use client";

import { Button } from "@/components/ui/button";
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
import useUnassignEmployee from "@/hooks/api/Pharmacy/unassignEmployee";
import { LogOut } from "lucide-react";
import { FC, useState } from "react";

const UnassignEmployee: FC<{ employeeId: string }> = ({ employeeId }) => {
  const { mutateAsync: unassignEmployee } = useUnassignEmployee();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleUnassignEmployee = () => {
    unassignEmployee({
      adminId: employeeId,
    });
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <LogOut className="hover:cursor-pointer hover:text-destructive"/>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Employee</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this employee from the pharmacy?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setIsDialogOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleUnassignEmployee}>
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UnassignEmployee;
