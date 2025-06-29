import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

const FILE_SIZE = 1 * 1024 * 1024;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/heic",
];

export const EditProfileSchema = (isCredentialsUser: boolean) =>
  Yup.object().shape({
    fullName: Yup.string()
      .min(3, "Full name must be at least 3 characters")
      .required("Full name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

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

    password: Yup.string().password().optional(),

    confirmPassword: Yup.string().when("password", (password, schema) => {
      if (isCredentialsUser && password && password[0]?.length > 0) {
        return schema
          .oneOf([Yup.ref("password")], "Passwords must match")
          .required("Password confirmation is required");
      }

      return schema.optional();
    }),
  });
