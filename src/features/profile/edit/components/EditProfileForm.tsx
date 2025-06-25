"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUpdateProfile from "@/hooks/api/profile/useUpdateProfile";
import { generateInitials } from "@/lib/generateInitials"; // Pastikan path ini benar
import { useFormik } from "formik";
import { Trash2, LoaderCircle } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { EditProfileSchema } from "../schemas";
import { useRouter } from "next/navigation";
import { Account } from "@/types/account";
import useDeletePic from "@/hooks/api/profile/useDeletePic";
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

interface EditProfileFormProps {
  user: Account | undefined;
  isLoading: boolean;
}

export function EditProfileForm({ user, isLoading }: EditProfileFormProps) {
  // Hanya gunakan `update` dari useSession untuk me-refresh data
  const { update: updateSession } = useSession();
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();
  const { mutate: deletePicture, isPending: isDeleting } = useDeletePic();
  const router = useRouter();

  // State untuk preview gambar
  const [preview, setPreview] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setPreview(user.profilePict || null);
    }
  }, [user]);

  const isCredentialsUser = user?.provider === "CREDENTIAL";
  const isGoogleUser = user?.provider === "GOOGLE";

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
      const emailChanged = values.email !== user?.email;

      const payload: {
        fullName: string;
        email?: string;
        profilePict?: File | null;
        password?: string;
      } = {
        fullName: values.fullName,
        profilePict: values.profilePict,
      };

      if (emailChanged && !isGoogleUser) {
        payload.email = values.email;
      }

      if (isCredentialsUser && values.password) {
        payload.password = values.password;
      }

      await updateProfile(payload, {
        onSuccess: async () => {
          if (emailChanged) {
            toast.success(
              "Profile updated! Please check your new email to re-verify.",
              {
                description:
                  "You will be logged out for security reasons in 3 seconds.",
              }
            );
            setTimeout(() => signOut({ callbackUrl: "/login" }), 1000);
          } else {
            toast.success("Profile updated successfully!");
            // Refresh sesi dan kembali ke halaman profil
            await updateSession();
            router.push("/profile");
          }
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

  // Fungsi untuk MENGHAPUS GAMBAR DARI SERVER
  const handleDeleteExistingPicture = () => {
    deletePicture(undefined, {
      onSuccess: async () => {
        setPreview(null);
        await updateSession();
      },
    });
  };

  // Fungsi untuk MENGHAPUS PREVIEW gambar yang BARU dipilih
  const handleRemovePreview = () => {
    formik.setFieldValue("profilePict", null);
    // Kembalikan preview ke gambar asli dari server (jika ada)
    setPreview(user?.profilePict || null);
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  const isNewImagePreview = preview !== user?.profilePict && preview !== null;

  const removeNewImagePreview = () => {
    formik.setFieldValue("profilePict", null);
    // Kembalikan preview ke gambar asli dari user
    setPreview(user?.profilePict || null);
    if (imageRef.current) imageRef.current.value = "";
  };

  // Tampilkan loading skeleton jika data user dari parent belum siap
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
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="grid gap-2 items-center justify-center text-center">
        <Label>Profile Picture</Label>
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
              <div className="text-3xl font-semibold text-muted-foreground">
                {generateInitials(user?.fullName)}
              </div>
            )}
          </div>

          {/* Tombol hapus hanya muncul jika ada gambar (baik lama maupun preview baru) */}
          {preview &&
            // Jika ini adalah preview gambar baru, tombol hapus hanya akan menghapus preview
            (isNewImagePreview ? (
              <Button
                size="icon"
                variant="destructive"
                className="absolute -top-1 -right-1 h-7 w-7 rounded-full"
                type="button"
                onClick={handleRemovePreview}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            ) : (
              // Jika ini gambar lama dari server, tombol hapus akan memicu modal konfirmasi
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-7 w-7 rounded-full"
                    type="button"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <LoaderCircle className="animate-spin h-4 w-4" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will permanently delete your current profile
                      picture from the server.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteExistingPicture}>
                      Yes, Delete Picture
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ))}
        </div>

        <Button
          size="sm"
          type="button"
          variant="outline"
          className="mx-auto mt-2"
          onClick={() => imageRef.current?.click()}
          disabled={isDeleting}
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
  );
}
