import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

const FILE_SIZE = 2 * 1024 * 1024; // 2MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

// Ubah skema menjadi sebuah fungsi yang menerima parameter
export const EditProfileSchema = (isCredentialsUser: boolean) => Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Full name must be at least 3 characters')
    .required('Full name is required'),
  
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  profilePict: Yup.mixed<File>()
    .nullable()
    .test('fileSize', 'File too large, max 2MB', value => !value || (value && value.size <= FILE_SIZE))
    .test('fileFormat', 'Unsupported format', value => !value || (value && SUPPORTED_FORMATS.includes(value.type))),

  // PERBAIKAN: Sederhanakan validasi password
  password: Yup.string()
    .password() // Terapkan aturan kekuatan password
    .optional(), // Jadikan opsional, tidak perlu `.when()` pada dirinya sendiri

  // PERBAIKAN: Buat `confirmPassword` bergantung pada `password`
  confirmPassword: Yup.string()
    .when('password', (password, schema) => {
      // Hanya wajibkan konfirmasi jika pengguna adalah `credentials` DAN password baru sedang diketik
      if (isCredentialsUser && password && password[0]?.length > 0) {
        return schema
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Password confirmation is required');
      }
      // Jika tidak, field ini tidak wajib
      return schema.optional();
    }),
});