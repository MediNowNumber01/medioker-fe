"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateInitials } from "@/lib/generateInitials";
import { Account} from "@/types/account";
import { useFormik } from "formik";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { EditAdminSchema } from "../schemas";
import useUpdateAdmin from "@/hooks/api/account/useUpdateAdmin";
import { AdminRole } from "@/types/admin";

interface EditAdminFormProps {
  admin: Account;
}

export function EditAdminForm({ admin }: EditAdminFormProps) {
  const { mutate: updateAdmin, isPending } = useUpdateAdmin(admin.id);
  const [preview, setPreview] = useState<string | null>(admin.profilePict || null);
  const imageRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      fullName: admin.fullName || "",
      email: admin.email || "",
      profilePict: null as File | null,
      adminRole: AdminRole.CASHIER,
    },
    validationSchema: EditAdminSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await updateAdmin(values);
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
        {/* ... UI untuk upload foto profil ... */}
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" name="fullName" value={formik.values.fullName} onChange={formik.handleChange} onBlur={formik.handleBlur} disabled={isPending} />
        {formik.touched.fullName && formik.errors.fullName && <p className="text-xs text-destructive">{formik.errors.fullName}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" value={formik.values.email} disabled />
        <p className="text-xs text-muted-foreground mt-1">Email cannot be changed.</p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="adminRole">Admin Role</Label>
        <Select name="adminRole" value={formik.values.adminRole} onValueChange={(value) => formik.setFieldValue("adminRole", value)} disabled={isPending}>
          <SelectTrigger><SelectValue placeholder="Select a role" /></SelectTrigger>
          <SelectContent>
            {Object.values(AdminRole).map((role) => (
              <SelectItem key={role} value={role}>{role}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {formik.touched.adminRole && formik.errors.adminRole && <p className="text-xs text-destructive">{formik.errors.adminRole}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isPending || !formik.dirty}>
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}