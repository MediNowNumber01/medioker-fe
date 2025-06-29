import { AdminRole } from '@/types/admin';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

const FILE_SIZE = 1 * 1024 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/heic', 'image/gif'];

export const CreateAdminSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Full name must be at least 3 characters')
    .required('Full name is required'),
  
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  
  password: Yup.string()
    .password()
    .required('Password is required'),
  
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),

  adminRole: Yup.string()
    .oneOf(Object.values(AdminRole), "Invalid role selected")
    .required("Admin role is required"),

  profilePict: Yup.mixed<File>()
    .required('A profile picture is required')
    .test('fileSize', 'File too large, max 2MB', value => value && value.size <= FILE_SIZE)
    .test('fileFormat', 'Unsupported format', value => value && SUPPORTED_FORMATS.includes(value.type)),
});