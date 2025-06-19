import * as yup from "yup";

export const UpdatePharmacySchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be at most 20 characters"),
  detailLocation: yup
    .string()
    .required("Detail location is required")
    .min(3, "Detail location must be at least 3 characters"),
  lat: yup
    .string()
    .required("Latitude is required")
    .test(
      "is-lat",
      "Latitude must be a number and min 7 digits after decimal",
      (value) => {
        if (typeof value !== "string") return false;
        const parts = value.split(".");
        return (
          parts.length === 2 &&
          parts[0].length > 0 &&
          parts[1].length >= 7 &&
          !isNaN(Number(parts[0])) &&
          !isNaN(Number(parts[1])) &&
          Number(parts[0]) >= -90 &&
          Number(parts[0]) <= 90
        );
      }
    ),
  lng: yup
    .string()
    .required("Longitude is required")
    .test(
      "is-lng",
      "Longitude must be a number and min 7 digits after decimal",
      (value) => {
        if (typeof value !== "string") return false;
        const parts = value.split(".");
        return (
          parts.length === 2 &&
          parts[0].length > 0 &&
          parts[1].length >= 7 &&
          !isNaN(Number(parts[0])) &&
          !isNaN(Number(parts[1])) &&
          Number(parts[0]) >= -180 &&
          Number(parts[0]) <= 180
        );
      }
    ),
  isMain: yup
    .string()
    .oneOf(["true", "false"], "Is main must be 'true' or 'false'")
    .required("Is main is required"),
});
