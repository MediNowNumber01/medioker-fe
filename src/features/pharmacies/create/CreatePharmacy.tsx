"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import useCreatePharmacy from "@/hooks/api/Pharmacy/useCreatePharmacy";
import { useFormik } from "formik";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { CreatePharmacySchema } from "./CreatePharmacySchema";
import LocationPicker from "./selectLocation/LocationPicker";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LocationType } from "@/types/location";
const CreatePharmacy = () => {
  const { mutateAsync: createPharmacy } = useCreatePharmacy();
  const initialValues = {
    name: "",
    description: "",
    picture: null,
    detailLocation: "",
    lat: "",
    lng: "",
    isMain: "false",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: CreatePharmacySchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await createPharmacy(values);
    },
  });

  const [selectedImage, setSelectedImage] = useState<string>("");
  const pictref = useRef<HTMLInputElement>(null);
  const onchangepicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      formik.setFieldTouched("picture", true);
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2MB");
        return;
      }
      if (
        !["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
          file.type
        )
      ) {
        toast.error("Only JPEG, PNG, or GIF files are allowed");
        return;
      }

      formik.setFieldValue("picture", file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const handleRemoveImage = () => {
    setSelectedImage("");
    formik.setFieldValue("picture", null);
    if (pictref.current) {
      pictref.current.value = "";
    }
  };
  return (
    <section className="container mx-auto flex flex-col gap-4 p-2">
      <Card>
        {/* header */}
        <div className="px-4  text-center">
          <h1 className="text-primary ">Create Pharmacy</h1>
          <p className="text-muted-foreground">
            Fill in the details below to create a new pharmacy.
          </p>
          <Separator className="my-4" />
        </div>

        {/* form */}
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 px-4"
          encType="multipart/form-data"
        >
          <div>
            <Label>Image / Logo</Label>
            {selectedImage && (
              <div className="flex w-full items-center justify-center">
                <div className="relative h-[200px] w-[200px] overflow-hidden rounded-md border-2 border-dashed border-gray-300">
                  <Image
                    src={selectedImage}
                    alt="picture"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            <div className="flex">
              <Input
                ref={pictref}
                id="eventPict"
                name="eventPict"
                type="file"
                accept="image/*"
                onChange={onchangepicture}
              />

              {selectedImage && (
                <Button
                  type="button"
                  className="bg-destructive p-2 text-white"
                  onClick={handleRemoveImage}
                >
                  Remove
                </Button>
              )}
            </div>
            {formik.dirty && formik.errors.picture && (
              <p className="text-sm text-destructive">
                {formik.errors.picture}
              </p>
            )}
          </div>
          {/* isMain */}
          <div className="space-y-2">
            <Label>Pharmacy Type</Label>
            <Select
              value={formik.values.isMain}
              onValueChange={(value) => formik.setFieldValue("isMain", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Main / Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Is Main Pharmacy?</SelectLabel>
                  <SelectItem value="true">Main</SelectItem>
                  <SelectItem value="false">Branch</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {formik.touched.isMain && formik.errors.isMain && (
              <p className="text-destructive text-sm">{formik.errors.isMain}</p>
            )}
          </div>

          {/* name */}
          <div className="space-y-2">
            <Label>Pharmacy Name</Label>
            <Input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter pharmacy name"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-destructive text-sm">{formik.errors.name}</p>
            )}
          </div>
          {/* description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter pharmacy description"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-destructive text-sm">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* detail location */}

          <div className="space-y-2">
            <Label className="mb-2">Location</Label>
            <LocationPicker
              onLocationSelect={(location: LocationType) => {
                formik.setFieldValue("lat", location.lat.toString());
                formik.setFieldValue("lng", location.lng.toString());
                formik.setFieldValue("detailLocation", location.address);
              }}
              initialAddress={""}
            />
            {formik.errors.lat && (
              <p className="text-destructive text-sm">{formik.errors.lat}</p>
            )}
            {formik.errors.lng && (
              <p className="text-destructive text-sm">{formik.errors.lng}</p>
            )}
            <div className="space-y-2">
              <Label className="mb-2">Detail Location</Label>
              <Textarea
                name="detailLocation"
                value={formik.values.detailLocation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter detail location"
              />
              {formik.touched.detailLocation &&
                formik.errors.detailLocation && (
                  <p className="text-destructive text-sm">
                    {formik.errors.detailLocation}
                  </p>
                )}
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-primary text-white hover:bg-primary/90"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default CreatePharmacy;
