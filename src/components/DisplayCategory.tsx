"use client";

import { Badge } from "@/components/ui/badge";
import { FC } from "react";

import useGetCategory from "@/hooks/api/Category/useGetCategory";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface DisplayCategoryProps {
  id: string | undefined;
  type: "text" | "badge";
  className?: string;
}
const DisplayCategory: FC<DisplayCategoryProps> = ({ id, type, className }) => {
  if (!id) return null; 
  const { data: category } = useGetCategory(id);
  if (!category) return null;

  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            {type === "text" ? (
              <Label className={className ?? className}>
                {category.data.name}
              </Label>
            ) : (
              <Badge
                variant="secondary"
                className={`text-xs h-fit px-2 py-1 ${className}`}
              >
                {category.data.name}
              </Badge>
            )}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle>{category.data.name}</DialogTitle>
            <DialogDescription>
              {category.data.description ||
                "No description available for this category."}
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default DisplayCategory;
