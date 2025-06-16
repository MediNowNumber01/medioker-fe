import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useDeleteCategory from "@/hooks/api/Category/useDeleteCategory";
import { Trash2 } from "lucide-react";

interface DeleteCategoryProps {
  id: string;
}

const DeleteCategory: FC<DeleteCategoryProps> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending, isSuccess } = useDeleteCategory();

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(id);
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this category? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleDelete} className="space-y-4">
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              onClick={() => setOpen(false)}
              variant="secondary"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" variant="destructive" disabled={isPending}>
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategory;
