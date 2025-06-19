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
import { use, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { CreatePharmacySchema } from "./CreatePharmacySchema";
import LocationPicker from "../components/selectLocation/LocationPicker";

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
import { BadgeCheck, CircleArrowLeft, CircleX } from "lucide-react";
import { redirect } from "next/navigation";
import { useDebounce } from "use-debounce";
import { axiosInstance } from "@/lib/axios";
const CreatePharmacy = () => {
  const { mutateAsync: createPharmacy } = useCreatePharmacy();
  const initialValues = {
    name: "",
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

  // handle name validation
  const [debounceName] = useDebounce(formik.values.name, 500);
  const [validName, setValidName] = useState<boolean>(false);
  const [validNameError, setValidNameError] = useState<string>("");
  const verifyname = async (name: string) => {
    try {
      const { data } = await axiosInstance.get("/pharmacies/verify-name", {
        params: { name },
      });
      return {
        isValid: data.isValid,
        message: data.message || "",
      };
    } catch (error) {
      return { isValid: false, message: "Error verifying pharmacy name" };
    }
  };
  useEffect(() => {
    if (debounceName.trim() === "") {
      setValidName(false);
      setValidNameError("");
      return;
    }
    verifyname(debounceName)
      .then((result) => {
        setValidName(result.isValid);
        setValidNameError(result.message);
      })
      .catch((error) => {
        console.error("Error verifying pharmacy name:", error);
        setValidName(false);
        setValidNameError("Error verifying pharmacy name");
      });
  }, [debounceName]);

  // handle picture change
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
        <div className="relative ">
          <CircleArrowLeft
            className="hidden absolute  md:block left-10 -top-5 translate-y-1/2 h-10 w-10 cursor-pointer "
            onClick={() => {
              redirect("/superadmin/pharmacies");
            }}
          />
          <div className="px-4  text-center">
            <h1 className="text-primary ">Create Pharmacy</h1>
            <p className="text-muted-foreground">
              Fill in the details below to create a new pharmacy.
            </p>
            <Separator className="my-4" />
          </div>
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
                    className="object-cover rounded-full"
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
            {formik.touched.picture && formik.errors.picture && (
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
            <div className="flex items-center">
              <Input
                className=" flex-1"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter pharmacy name"
              />
              {formik.touched.name && (
                <>
                  {validName ? (
                    <BadgeCheck className="text-green-500 ml-2" />
                  ) : (
                    <CircleX className="text-red-500 ml-2" />
                  )}
                </>
              )}
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="text-destructive text-sm">{formik.errors.name}</p>
            )}
            {formik.touched.name && !validName && (
              <p className="text-destructive text-sm">{validNameError}</p>
            )}
          </div>

          {/* detail location */}

          <div className="space-y-2">
            <Label className="mb-2">Location</Label>

            <div>
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
            </div>
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
              disabled={!formik.isValid || formik.isSubmitting || !validName}
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
