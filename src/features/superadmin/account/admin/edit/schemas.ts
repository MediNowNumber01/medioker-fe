import { AdminRole } from "@/types/admin"
import * as Yup from "yup"

const FILE_SIZE = 1 * 1024 * 1024 // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/heic"]

export const EditAdminSchema = (isCredentialsUser = true) =>
  Yup.object().shape({
    fullName: Yup.string()
      .min(3, "Full name must be at least 3 characters")
      .max(50, "Full name must be less than 50 characters")
      .required("Full name is required"),

    email: Yup.string().email("Invalid email format").required("Email is required"),

    profilePict: Yup.mixed<File>()
      .nullable()
      .test("fileSize", "File too large, max 2MB", (value) => !value || (value && value.size <= FILE_SIZE))
      .test("fileFormat", "Unsupported format", (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))),

    adminRole: Yup.string().oneOf(Object.values(AdminRole), "Invalid role selected").required("Admin role is required"),

    password: isCredentialsUser
      ? Yup.string()
          .min(8, "Password must be at least 8 characters")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number",
          )
          .optional()
      : Yup.string().optional(),

    confirmPassword: isCredentialsUser
      ? Yup.string()
          .oneOf([Yup.ref("password")], "Passwords must match")
          .when("password", {
            is: (password: string) => password && password.length > 0,
            then: (schema) => schema.required("Please confirm your password"),
            otherwise: (schema) => schema.optional(),
          })
      : Yup.string().optional(),
  })
