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
import useUpdateAdmin from "@/hooks/api/admin/useUpdateAdmin";
import { generateInitials } from "@/lib/generateInitials";
import { type Admin, AdminRole } from "@/types/admin";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { EditAdminSchema } from "../schemas";

interface EditAdminFormProps {
  admin: Admin;
  isLoading?: boolean;
}

export function EditAdminForm({ admin, isLoading }: EditAdminFormProps) {
  const { mutateAsync: updateAdmin, isPending } = useUpdateAdmin(admin.id!);
  const router = useRouter();

  const [preview, setPreview] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (admin?.account) {
      setPreview(admin.account.profilePict || null);
    }
  }, [admin]);

  const isCredentialsUser = admin?.account?.provider === "CREDENTIAL";
  const isGoogleUser = admin?.account?.provider === "GOOGLE";

  const formik = useFormik({
    initialValues: {
      fullName: admin?.account?.fullName || "",
      email: admin?.account?.email || "",
      profilePict: null as File | null,
      adminRole: admin?.adminRole || AdminRole.CASHIER,
      password: "",
      confirmPassword: "",
    },
    validationSchema: EditAdminSchema(isCredentialsUser),
    enableReinitialize: true,
    onSubmit: async (values) => {
      const emailChanged = values.email !== admin?.account?.email;

      const payload: {
        fullName: string;
        email?: string;
        profilePict?: File | null;
        adminRole: AdminRole;
        password?: string;
      } = {
        fullName: values.fullName,
        profilePict: values.profilePict,
        adminRole: values.adminRole,
      };

      if (emailChanged && !isGoogleUser) {
        payload.email = values.email;
      }

      if (isCredentialsUser && values.password) {
        payload.password = values.password;
      }

      await updateAdmin(payload, {
        onSuccess: () => {
          if (emailChanged) {
            toast.success(
              "Admin updated! The admin will need to verify their new email address.",
              {
                description:
                  "Email verification will be required for the new email.",
              }
            );
          } else {
            toast.success("Admin updated successfully!");
          }
          router.push("/superadmin/accounts/admin");
        },
      });
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("profilePict", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemovePreview = () => {
    formik.setFieldValue("profilePict", null);
    setPreview(admin?.account?.profilePict || null);
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  const isNewImagePreview =
    preview !== admin?.account?.profilePict && preview !== null;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="h-28 w-28 rounded-full bg-muted animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-5 w-24 bg-muted rounded-md animate-pulse"></div>
          <div className="h-10 w-full bg-muted rounded-md animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-5 w-24 bg-muted rounded-md animate-pulse"></div>
          <div className="h-10 w-full bg-muted rounded-md animate-pulse"></div>
        </div>
        <div className="h-10 w-full bg-muted rounded-md animate-pulse mt-4"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid gap-2 items-center justify-center text-center">
          <Label>Profile Picture</Label>
          <div className="relative mx-auto h-28 w-28">
            <div className="h-28 w-28 rounded-full bg-muted border-2 border-dashed flex items-center justify-center overflow-hidden">
              {preview ? (
                <Image
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="text-3xl font-semibold text-muted-foreground">
                  {generateInitials(admin?.account?.fullName)}
                </div>
              )}
            </div>

            {isNewImagePreview && (
              <Button
                size="icon"
                variant="destructive"
                className="absolute -top-1 -right-1 h-7 w-7 rounded-full"
                type="button"
                onClick={handleRemovePreview}
              >
                ×
              </Button>
            )}
          </div>

          <Button
            size="sm"
            type="button"
            variant="outline"
            className="mx-auto mt-2 bg-transparent"
            onClick={() => imageRef.current?.click()}
            disabled={isPending}
          >
            Change Picture
          </Button>
          <Input
            ref={imageRef}
            id="profilePictFile"
            name="profilePictFile"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
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
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isPending}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <p className="text-xs text-destructive">{formik.errors.fullName}</p>
          )}
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
            disabled={isPending || isGoogleUser}
          />
          {isGoogleUser && (
            <p className="text-xs text-muted-foreground mt-1">
              Email cannot be changed for Google accounts.
            </p>
          )}
          {formik.touched.email && formik.errors.email && (
            <p className="text-xs text-destructive">{formik.errors.email}</p>
          )}
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
            <p className="text-xs text-destructive">
              {formik.errors.adminRole}
            </p>
          )}
        </div>

        {!isGoogleUser && (
          <>
            <div className="border-t pt-4 mt-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Change Password (Optional)
              </h3>
            </div>
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
          </>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isPending || !formik.dirty}
        >
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
