import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useCreateCategory from "@/hooks/api/Category/useCreateCategory";
import { Input } from "@/components/ui/input";
import { Category } from "@/app/types/semuaNgerapiinyaNtar";
import useUpdateCategory from "@/hooks/api/Category/useUpdateCategory";
import { Edit } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { EditCategorySchema } from "./EditCategorySchema";

interface EditCategoryProps {
  category: Category;
}

const EditCategory: FC<EditCategoryProps> = ({ category }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useUpdateCategory();
  const initialValues = {
    name: category.name || "",
    description: category.description || "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: EditCategorySchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const result = await mutateAsync({ id: category.id, ...values });
      if (result) {
        setOpen(false);
        formik.resetForm({ values: initialValues });
      }
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit category</DialogTitle>
          <DialogDescription>
            Please enter the new details for the category.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid w-full gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              placeholder="Category Name"
              id="name"
              {...formik.getFieldProps("name")}
              className="w-full border rounded px-3 py-2 bg-card"
              required
            />
          </div>
          <div className="grid w-full gap-3">
            <Label htmlFor="description">Category Description</Label>
            <Textarea
              placeholder="Type your message here."
              {...formik.getFieldProps("description")}
              className="bg-card"
              id="description"
            />
          </div>
          <div className="flex justify-between">
            <Button
              onClick={() => setOpen(false)}
              variant="secondary"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || !formik.isValid || !formik.dirty}
            >
              {isPending ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;
