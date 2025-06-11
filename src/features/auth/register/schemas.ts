import * as Yup from 'yup';
import YupPassword from 'yup-password';

// Aktifkan yup-password
YupPassword(Yup);

// Skema untuk registrasi akun (satu langkah)
export const RegisterSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Full name must be at least 3 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .password() // Memeriksa kekuatan password (min 8 char, 1 huruf kecil, 1 huruf besar, 1 angka, 1 simbol)
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
});