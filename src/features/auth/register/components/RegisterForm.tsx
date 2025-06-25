"use client";
import { useFormik } from "formik";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterSchema } from "../schemas";
import useRegister from "@/hooks/api/auth/useRegister";
import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { Trash2, User } from "lucide-react";

export function RegisterForm() {
  const { mutateAsync: register, isPending } = useRegister();

  const [preview, setPreview] = useState<string | null>(null);
  const profilePictRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePict: null as File | null,
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      const { confirmPassword, ...registerData } = values;
      await register(registerData);
    },
  });

  const onChangeProfilePict = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("profilePict", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeProfilePict = () => {
    formik.setFieldValue("profilePict", null);
    setPreview(null);
    if (profilePictRef.current) {
      profilePictRef.current.value = "";
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Create an Account</CardTitle>
        <CardDescription>
          Join us by filling out the information below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="grid gap-4">
          <div className="grid gap-2 items-center justify-center text-center">
            <Label htmlFor="profilePict">Profile Picture (Optional)</Label>
            {preview ? (
              <div className="relative mx-auto h-24 w-24">
                <Image
                  src={preview}
                  alt="Profile picture preview"
                  fill
                  className="rounded-full object-cover"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-7 w-7 rounded-full"
                  type="button"
                  onClick={removeProfilePict}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Label
                htmlFor="profilePict"
                className="mx-auto h-24 w-24 cursor-pointer rounded-full bg-muted border-2 border-dashed flex items-center justify-center"
              >
                <User className="h-8 w-8 text-gray-400" />
              </Label>
            )}
            <Input
              ref={profilePictRef}
              id="profilePict"
              name="profilePict"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={onChangeProfilePict}
              onBlur={formik.handleBlur}
            />
            {formik.touched.profilePict && formik.errors.profilePict && (
              <p className="text-xs text-destructive">
                {formik.errors.profilePict as string}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isPending}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-xs text-destructive">
                {formik.errors.fullName}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isPending}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-destructive">{formik.errors.email}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
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
            <Label htmlFor="confirmPassword">Confirm Password</Label>
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
            {isPending ? "Creating account..." : "Create Account"}
          </Button>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
