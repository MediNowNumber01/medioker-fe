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
import { ForgotPasswordSchema } from "../schemas";
import useForgotPassword from "@/hooks/api/auth/useForgotPassword";

export function ForgotPasswordForm() {
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      await forgotPassword(values);
    },
  });

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Forgot Your Password?</CardTitle>
        <CardDescription>
          Enter your email and we'll send you a link to get back into your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isPending}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-destructive">
                {formik.errors.email}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Sending..." : "Send Reset Link"}
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
}