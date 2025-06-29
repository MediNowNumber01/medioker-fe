"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCreateAdmin from "@/hooks/api/admin/useCreateAdmin";
import { AdminRole } from "@/types/account";
import { useFormik } from "formik";
import { Trash2, User } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { CreateAdminSchema } from "../schemas";

export function CreateAdminForm() {
  const { mutate: createAdmin, isPending } = useCreateAdmin();
  const [preview, setPreview] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      adminRole: "" as AdminRole | "",
      profilePict: null as File | null,
    },
    validationSchema: CreateAdminSchema,
    onSubmit: async (values) => {
      await createAdmin(values as any);
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("profilePict", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    formik.setFieldValue("profilePict", null);
    setPreview(null);
    if (imageRef.current) imageRef.current.value = "";
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="grid gap-2 items-center justify-center text-center">
        <Label htmlFor="profilePict">Profile Picture</Label>
        <div className="relative mx-auto h-28 w-28">
          <div className="h-28 w-28 rounded-full bg-muted border-2 border-dashed flex items-center justify-center overflow-hidden">
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <User className="h-12 w-12 text-gray-400" />
            )}
          </div>
          {preview && (
            <Button
              size="icon"
              variant="destructive"
              className="absolute -top-1 -right-1 h-7 w-7 rounded-full"
              type="button"
              onClick={removeImage}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Input
          ref={imageRef}
          id="profilePict"
          type="file"
          className="mx-auto w-fit text-xs mt-2"
          accept="image/*"
          onChange={handleImageChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.profilePict && formik.errors.profilePict && (
          <p className="text-xs text-destructive">
            {formik.errors.profilePict as string}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isPending}
          />
          <p className="text-xs text-destructive h-3">
            {formik.touched.fullName && formik.errors.fullName}
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isPending}
          />
          <p className="text-xs text-destructive h-3">
            {formik.touched.email && formik.errors.email}
          </p>
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
          <p className="text-xs text-destructive h-3">
            {formik.touched.password && formik.errors.password}
          </p>
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
          <p className="text-xs text-destructive h-3">
            {formik.touched.confirmPassword && formik.errors.confirmPassword}
          </p>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="adminRole">Admin Role</Label>
        <Select
          name="adminRole"
          value={formik.values.adminRole}
          onValueChange={(value) => formik.setFieldValue("adminRole", value)}
          disabled={isPending}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(AdminRole).map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {formik.touched.adminRole && formik.errors.adminRole && (
          <p className="text-xs text-destructive">{formik.errors.adminRole}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating Admin..." : "Create Admin Account"}
      </Button>
    </form>
  );
}
