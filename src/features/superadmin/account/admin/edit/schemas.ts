import { AdminRole } from "@/types/admin";
import * as Yup from "yup";

const FILE_SIZE = 2 * 1024 * 1024; // 2MB
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/heic"
];

export const EditAdminSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),

  profilePict: Yup.mixed<File>()
    .nullable()
    .test(
      "fileSize",
      "File too large, max 2MB",
      (value) => !value || (value && value.size <= FILE_SIZE)
    )
    .test(
      "fileFormat",
      "Unsupported format",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    ),

  adminRole: Yup.string()
    .oneOf(Object.values(AdminRole), "Invalid role selected")
    .required("Admin role is required"),
});
