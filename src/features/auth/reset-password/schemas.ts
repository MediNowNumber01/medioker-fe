import * as Yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(Yup)

export const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string().required("Password is required").min(6),
    confirmPassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref("password")], "Your password does not match")
})