import { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CreateCategorySchema } from "./CreateCategorySchema";
import { useFormik } from "formik";

const CreateCategory = () => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createCategory, isPending } = useCreateCategory();

  const initialValues = {
    name: "",
    description: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: CreateCategorySchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const result = await createCategory(values);
      if (result) {
        setOpen(false);
        formik.resetForm({ values: initialValues });
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Category</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] ">
        <DialogHeader>
          <DialogTitle>Create a new category</DialogTitle>
          <DialogDescription>
            Please enter the details for the new category.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="space-y-4 relative ">
            <div className="grid w-full gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Category Name"
                {...formik.getFieldProps("name")}
                className="w-full border rounded px-3 py-2 bg-card"
                required
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="grid w-full gap-3">
              <Label htmlFor="description">Category Description</Label>
              <Textarea
                placeholder="Type your message here."
                id="description"
                className="bg-card"
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.description}
                </div>
              ) : null}
            </div>
            <div className="flex justify-between">
              <Button
                type="button"
                onClick={() => {
                  setOpen(false);
                  formik.resetForm({ values: initialValues });
                }}
                variant="secondary"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending || !formik.isValid || !formik.dirty}
              >
                {isPending ? "Creating..." : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategory;
