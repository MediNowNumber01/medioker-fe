"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import Link from "next/link";
import { ResetPasswordSchema } from "../schemas";
import { FC } from "react";
import useResetPassword from "@/hooks/api/auth/useResetPassword";

interface ResetPasswordFormProps {
  token: string;
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ token }) => {
  const { mutateAsync: resetPassword, isPending } = useResetPassword(token);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      await resetPassword(values);
    },
  });

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Set a New Password</CardTitle>
        <CardDescription>
          Create a new, strong password for your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isPending}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-destructive">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isPending}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-xs text-destructive">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          <Button type="submit" className="w-full mt-2" disabled={isPending}>
            {isPending ? "Resetting..." : "Set New Password"}
          </Button>

          <div className="mt-4 text-center text-sm">
            <Link href="/login" className="underline underline-offset-4">
              Back to Login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
