"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAddAddress from "@/hooks/api/address/useAddAddress";
import { LocationType } from "@/types/location";
import { useFormik } from "formik";
import { AddressSchema } from "../schemas";
import LocationPicker from "./LocationPicker";

interface AddressFormProps {
  onSuccess?: () => void;
}

export function AddressForm({ onSuccess }: AddressFormProps) {
  const { mutate: createAddress, isPending } = useAddAddress();

  const formik = useFormik({
    initialValues: {
      label: "",
      fullAddress: "",
      postalCode: "",
      latitude: "",
      longitude: "",
      isPrimary: false,
    },
    validationSchema: AddressSchema,
    onSubmit: async (values) => {
      createAddress(values, {
        onSuccess: () => {
          if (onSuccess) onSuccess();
        },
      });
    },
  });

  const handleLocationSelect = (location: LocationType) => {
    formik.setFieldValue("latitude", location.lat.toString());
    formik.setFieldValue("longitude", location.lng.toString());
    formik.setFieldValue("fullAddress", location.address);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="label">Address Label</Label>
        <Input
          id="label"
          name="label"
          placeholder="e.g., Home, Office"
          value={formik.values.label}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isPending}
        />
        <p className="text-xs text-destructive h-3">
          {formik.touched.label && formik.errors.label}
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="fullAddress">Full Address</Label>
        <Textarea
          id="fullAddress"
          name="fullAddress"
          placeholder="Address details will be filled automatically from map"
          value={formik.values.fullAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={3}
          disabled
        />
        <p className="text-xs text-destructive h-3">
          {formik.touched.fullAddress && formik.errors.fullAddress}
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="postalCode">Postal Code</Label>
        <Input
          id="postalCode"
          name="postalCode"
          placeholder="e.g., 55281"
          value={formik.values.postalCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isPending}
        />
        <p className="text-xs text-destructive h-3">
          {formik.touched.postalCode && formik.errors.postalCode}
        </p>
      </div>

      <div className="grid gap-2">
        <Label>Pinpoint Location & Address</Label>
        <LocationPicker onLocationSelect={handleLocationSelect} />
        <p className="text-xs text-destructive h-3">
          {formik.touched.latitude && formik.errors.latitude}
        </p>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox
          id="isPrimary"
          name="isPrimary"
          checked={formik.values.isPrimary}
          onCheckedChange={(checked) =>
            formik.setFieldValue("isPrimary", checked)
          }
        />
        <Label
          htmlFor="isPrimary"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Set as primary address
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Saving..." : "Save Address"}
      </Button>
    </form>
  );
}
