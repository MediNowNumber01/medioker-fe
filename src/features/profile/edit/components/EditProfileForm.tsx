"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useDeletePic from "@/hooks/api/profile/useDeletePic";
import useUpdateProfile from "@/hooks/api/profile/useUpdateProfile";
import { generateInitials } from "@/lib/generateInitials";
import type { Account } from "@/types/account";
import { useFormik } from "formik";
import { LoaderCircle, Trash2, Upload, CheckCircle2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { EditProfileSchema } from "../schemas";
import useGetAccount from "@/hooks/api/profile/useGetAccount";

export function EditProfileForm() {
  const { data: user, isLoading } = useGetAccount();
  const { update: updateSession } = useSession();
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();
  const { mutate: deletePicture, isPending: isDeleting } = useDeletePic();
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "image/heic",
  ];

  useEffect(() => {
    if (user) {
      setPreview(user.profilePict || null)
    }
  }, [user])

  const isCredentialsUser = user?.provider === "CREDENTIAL"
  const isGoogleUser = user?.provider === "GOOGLE"

  const formik = useFormik({
    initialValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      profilePict: null as File | null,
      password: "",
      confirmPassword: "",
    },
    validationSchema: EditProfileSchema(isCredentialsUser),
    onSubmit: async (values) => {
      const emailChanged = values.email !== user?.email

      const payload: {
        fullName: string
        email?: string
        profilePict?: File | null
        password?: string
      } = {
        fullName: values.fullName,
        profilePict: values.profilePict,
      }

      if (emailChanged && !isGoogleUser) {
        payload.email = values.email
      }

      if (isCredentialsUser && values.password) {
        payload.password = values.password
      }

      await updateProfile(payload, {
        onSuccess: async () => {
          if (emailChanged) {
            toast.success("Profile updated! Please check your new email to re-verify.", {
              description: "You will be logged out for security reasons in 3 seconds.",
            })
            setTimeout(() => signOut({ callbackUrl: "/login" }), 1000)
          } else {
            toast.success("Profile updated successfully!");

            await updateSession();
            router.push("/profile");
          }
        },
      })
    },
  })

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        toast.error(
          "Invalid file type. Please upload JPG, JPEG, PNG, HEIC, or GIF files only."
        );
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        toast.error(
          "File size too large. Please upload files smaller than 2MB."
        );
        return;
      }

      formik.setFieldValue("profilePict", file);
      setPreview(URL.createObjectURL(file));
    }
  }

  const handleDeleteExistingPicture = () => {
    deletePicture(undefined, {
      onSuccess: async () => {
        setPreview(null)
        await updateSession()
      },
    })
  }

  const handleRemovePreview = () => {
    formik.setFieldValue("profilePict", null)
    setPreview(user?.profilePict || null)
    if (imageRef.current) {
      imageRef.current.value = ""
    }
  }

  const isNewImagePreview = preview !== user?.profilePict && preview !== null;

  if (isLoading) {
    return (
      <div className="max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
        <div className="p-8">
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="h-32 w-32 rounded-full bg-muted animate-pulse"></div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="h-5 w-24 bg-muted rounded-md animate-pulse"></div>
                <div className="h-10 w-full bg-muted rounded-md animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-5 w-24 bg-muted rounded-md animate-pulse"></div>
                <div className="h-10 w-full bg-muted rounded-md animate-pulse"></div>
              </div>
              <div className="h-10 w-full bg-muted rounded-md animate-pulse mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
      <div className="p-6 lg:p-8 xl:p-12">
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          <Card className="border-2 border-dashed border-primary/20 bg-primary/5">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg text-center justify-center">
                <Upload className="h-5 w-5 text-primary" />
                Profile Picture
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="h-32 w-32 lg:h-40 lg:w-40 xl:h-48 xl:w-48 rounded-full bg-muted border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                    {preview ? (
                      <Image
                        src={preview || "/placeholder.svg"}
                        alt="Profile Preview"
                        fill
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-muted-foreground">
                        {generateInitials(user?.fullName)}
                      </div>
                    )}
                  </div>

                  {preview &&
                    (isNewImagePreview ? (
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-8 w-8 lg:h-10 lg:w-10 rounded-full shadow-lg"
                        type="button"
                        onClick={handleRemovePreview}
                      >
                        <Trash2 className="h-4 w-4 lg:h-5 lg:w-5" />
                      </Button>
                    ) : (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="icon"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-8 w-8 lg:h-10 lg:w-10 rounded-full shadow-lg"
                            type="button"
                            disabled={isDeleting}
                          >
                            {isDeleting ? (
                              <LoaderCircle className="animate-spin h-4 w-4 lg:h-5 lg:w-5" />
                            ) : (
                              <Trash2 className="h-4 w-4 lg:h-5 lg:w-5" />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action will permanently delete your current
                              profile picture from the server.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteExistingPicture}
                            >
                              Yes, Delete Picture
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ))}
                </div>
              </div>

              <div className="text-center space-y-3">
                <Button
                  size="sm"
                  type="button"
                  variant="outline"
                  className="px-6 bg-transparent"
                  onClick={() => imageRef.current?.click()}
                  disabled={isDeleting}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Change Picture
                </Button>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Supported: JPG, JPEG, PNG, HEIC, GIF • Max 2MB</span>
                </div>
              </div>

              <Input
                ref={imageRef}
                id="profilePictFile"
                name="profilePictFile"
                type="file"
                className="hidden"
                accept="image/jpeg,image/jpg,image/png,image/heic,image/gif"
                onChange={handleImageChange}
              />

              {formik.touched.profilePict && formik.errors.profilePict && (
                <p className="text-sm text-destructive text-center flex items-center justify-center gap-2">
                  <span className="h-1 w-1 bg-destructive rounded-full" />
                  {formik.errors.profilePict as string}
                </p>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                Personal Information
              </h3>
              <div className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isPending}
                    className="h-11"
                  />
                  {formik.touched.fullName && formik.errors.fullName && (
                    <p className="text-sm text-destructive flex items-center gap-2">
                      <span className="h-1 w-1 bg-destructive rounded-full" />
                      {formik.errors.fullName}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isPending || isGoogleUser}
                    className="h-11"
                  />
                  {isGoogleUser && (
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800"
                      >
                        Google Account
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        Email cannot be changed for Google accounts.
                      </p>
                    </div>
                  )}
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-sm text-destructive flex items-center gap-2">
                      <span className="h-1 w-1 bg-destructive rounded-full" />
                      {formik.errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {!isGoogleUser && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                  Security
                </h3>
                <Card className="border-muted">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base">Change Password</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Leave blank to keep current password
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="password" className="text-sm font-medium">
                        New Password
                      </Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={isPending}
                        className="h-11"
                      />
                      {formik.touched.password && formik.errors.password && (
                        <p className="text-sm text-destructive flex items-center gap-2">
                          <span className="h-1 w-1 bg-destructive rounded-full" />
                          {formik.errors.password}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium"
                      >
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={isPending}
                        className="h-11"
                      />
                      {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword && (
                          <p className="text-sm text-destructive flex items-center gap-2">
                            <span className="h-1 w-1 bg-destructive rounded-full" />
                            {formik.errors.confirmPassword}
                          </p>
                        )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <div className="flex justify-center lg:justify-end">
            <Button
              type="submit"
              size="lg"
              className="w-full lg:w-auto lg:min-w-[200px] h-12 text-base font-medium"
              disabled={isPending || !formik.dirty}
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving Changes...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Save Changes
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
