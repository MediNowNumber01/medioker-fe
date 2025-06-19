import * as Yup from "yup";

export const CreateCategorySchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "name must be at least 3 characters long")
    .required("name is required"),
  description: Yup.string()
    .trim()
    .test(
      "min-words",
      "description must be at least 3 words",
      value => (value ? value.trim().split(/\s+/).length >= 3 : false)
    )
    .required("description is required"),
});
