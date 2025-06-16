import * as yup from "yup";

export const CreatePharmacySchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  description: yup
    .string()
    .required("Description is required")
    .test(
      "min-words",
      "Description must have at least 3 words",
      (value) =>
        typeof value === "string" && value.trim().split(/\s+/).length >= 3
    ),
  picture: yup.mixed().required("picture / logo is required"),
  detailLocation: yup
    .string()
    .required("Detail location is required")
    .min(3, "Detail location must be at least 3 characters"),
  lat: yup
    .string()
    .required("Latitude is required")
    .test("is-decimal", "Latitude must be a decimal number", (value) => {
      if (typeof value !== "string") return false;
      const parts = value.split(".");
      return (
        parts.length === 2 &&
        parts[0].length > 0 &&
        parts[1].length > 7 &&
        !isNaN(Number(parts[0])) &&
        !isNaN(Number(parts[1]))
      );
    }),
  lng: yup
    .string()
    .required("Longitude is required")
    .test("is-decimal", "Longitude must be a decimal number", (value) => {
      if (typeof value !== "string") return false;
      const parts = value.split(".");
      return (
        parts.length === 2 &&
        parts[0].length > 0 &&
        parts[1].length > 7 &&
        !isNaN(Number(parts[0])) &&
        !isNaN(Number(parts[1]))
      );
    }),
  isMain: yup
    .string()
    .oneOf(["true", "false"], "Is main must be 'true' or 'false'")
    .required("Is main is required"),
});
