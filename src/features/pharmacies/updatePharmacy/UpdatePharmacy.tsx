"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import LocationPicker from "../components/selectLocation/LocationPicker";
import { UpdatePharmacySchema } from "./UpdatePharmacySchema";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDetailPharmacy } from "@/hooks/api/Pharmacy/useGetDetailPharmacy";
import useUpdatePharmacy from "@/hooks/api/Pharmacy/useUpdatePharmacy";
import { axiosInstance } from "@/lib/axios";
import { LocationType } from "@/types/location";
import { BadgeCheck, CircleArrowLeft, CircleX } from "lucide-react";
import { redirect } from "next/navigation";
import { useDebounce } from "use-debounce";
import { cn } from "@/lib/generateInitials";

interface UpdatePharmacyProps {
  pharmacyId: string;
}
const UpdatePharmacy: FC<UpdatePharmacyProps> = ({ pharmacyId }) => {
  const { mutateAsync: updatePharmacy } = useUpdatePharmacy(pharmacyId);
  const { data: pharmacy, isError } = useGetDetailPharmacy(pharmacyId);
  if (isError) {
    return redirect("/superadmin/pharmacies");
  }
  console.log("pharmacy", pharmacy);
  const initialValues = {
    name: pharmacy?.data.name || "",
    picture: null,
    detailLocation: pharmacy?.data.detailLocation || "",
    lat: pharmacy?.data.lat || "",
    lng: pharmacy?.data.lng || "",
    isMain: pharmacy?.data.isMain ? "true" : "false",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: UpdatePharmacySchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await updatePharmacy({ id: pharmacyId, ...values });
    },
  });
  const [selectedImage, setSelectedImage] = useState<string>("");
  const pictref = useRef<HTMLInputElement>(null);

  const [debounceName] = useDebounce(formik.values.name, 500);
  const [validName, setValidName] = useState<boolean>(true);
  const [validNameError, setValidNameError] = useState<string>("");
  const verifyname = async (name: string) => {
    try {
      const { data } = await axiosInstance.get("/pharmacies/verify-name", {
        params: { name, id: pharmacyId },
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
        <div className="relative ">
          <CircleArrowLeft
            className="hidden absolute  md:block left-10 -top-5 translate-y-1/2 h-10 w-10 cursor-pointer "
            onClick={() => {
              redirect("/superadmin/pharmacies");
            }}
          />
          <div className="px-4  text-center">
            <h1 className="text-primary ">Update Pharmacy</h1>
            <p className="text-muted-foreground">
              Fill in the details below to update the pharmacy.
            </p>
            <Separator className="my-4" />
          </div>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 px-4"
          encType="multipart/form-data"
        >
          <div>
            <Label>Image / Logo</Label>
            {(selectedImage || pharmacy?.data.picture) && (
              <div className="flex w-full items-center justify-center">
                <div className="relative h-[200px] w-[200px] overflow-hidden rounded-md border-2 border-dashed border-gray-300">
                  <Image
                    src={selectedImage ? selectedImage : pharmacy!.data.picture}
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
                  <SelectItem
                    value="false"
                    className={cn({
                      hidden: initialValues.isMain === "true",
                    })}
                  >
                    Branch
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {formik.touched.isMain &&
              formik.errors.isMain &&
              typeof formik.errors.isMain === "string" && (
                <p className="text-destructive text-sm">
                  {formik.errors.isMain}
                </p>
              )}
          </div>

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
            {formik.touched.name &&
              formik.errors.name &&
              typeof formik.errors.name === "string" && (
                <p className="text-destructive text-sm">{formik.errors.name}</p>
              )}
            {!validName && validNameError && (
              <p className="text-destructive text-sm">{validNameError}</p>
            )}
          </div>

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
              {formik.errors.lat && typeof formik.errors.lat === "string" && (
                <p className="text-destructive text-sm">{formik.errors.lat}</p>
              )}
              {formik.errors.lng && typeof formik.errors.lng === "string" && (
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
                  formik.errors.detailLocation &&
                  typeof formik.errors.detailLocation === "string" && (
                    <p className="text-destructive text-sm">
                      {formik.errors.detailLocation}
                    </p>
                  )}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button
              type="button"
              disabled={formik.isSubmitting}
              variant={"secondary"}
              className="hover:cursor-pointer"
              onClick={() => {
                redirect("/superadmin/pharmacies");
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-primary text-white hover:bg-primary/90"
              disabled={
                !formik.isValid ||
                formik.isSubmitting ||
                !validName ||
                !formik.dirty
              }
            >
              Submit
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default UpdatePharmacy;
