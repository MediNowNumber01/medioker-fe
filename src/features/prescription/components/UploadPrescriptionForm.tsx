"use client";

import { useFormik } from "formik";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import { UploadPrescriptionSchema } from "../schemas";
import { UserAddress } from "@/types/userAddress";
import { Pharmacy } from "@/types/pharmacy";

// Komponen UI & Lainnya
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { UploadCloud, Trash2, MapPin } from "lucide-react";
import { toast } from "sonner";

// Hooks untuk interaksi API
import useGetPrescriptionPharmacies, { PharmacyWithDistance } from "@/hooks/api/prescription/useGetPrescriptionPharmacies";
import useCreatePrescription from "@/hooks/api/prescription/useCreatePrescription";
import useGetUserAddresses from "@/hooks/api/prescription/useGetUserAddresses";
import useAxios from "@/hooks/useAxios";

export function UploadPrescriptionForm() {
 useAxios();
  const { mutateAsync: createPrescription, isPending } = useCreatePrescription();
  const [userLocation, setUserLocation] = useState<{ latitude: string; longitude: string; } | null>(null);

  const { data: userAddresses, isLoading: isLoadingAddresses } = useGetUserAddresses();
  const { data: pharmacies, isLoading: isLoadingPharmacies } = useGetPrescriptionPharmacies({
    lat: userLocation?.latitude,
    lng: userLocation?.longitude,
  });

  const imageRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/gif',
  'image/svg+xml', 
  'image/heic'
];

  useEffect(() => {
    setUserLocation({ latitude: "-7.7956", longitude: "110.3695" });
  }, []);

  const formik = useFormik({
    initialValues: {
      prescriptionImages: [] as File[],
      notes: "",
      deliveryMethod: "delivery" as "delivery" | "pickup",
      addressId: "",
      pharmacyId: "",
    },
    validationSchema: UploadPrescriptionSchema,
    onSubmit: async (values) => {
      await createPrescription(values); 
    },
  })

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const currentFiles = formik.values.prescriptionImages;
    if (currentFiles.length + files.length > 5) {
      toast.error("You can upload a maximum of 5 images.");
      return;
    }

    const newFiles = Array.from(files);

    const invalidFiles = newFiles.filter(file => !ALLOWED_IMAGE_TYPES.includes(file.type));
    if (invalidFiles.length > 0) {
      formik.setFieldError('prescriptionImages', `Invalid file type: ${invalidFiles[0].name}. Please upload images only.`);
      toast.error('Invalid file type detected.');
      return; // Hentikan proses jika ada file tidak valid
    }
    
    const validFiles = newFiles.filter((file) => file.size <= 2 * 1024 * 1024);
    if (validFiles.length !== newFiles.length) {
      toast.error("Some files were too large (max 2MB) and were not added.");
    }

    const updatedFiles = [...currentFiles, ...validFiles];
    formik.setFieldValue("prescriptionImages", updatedFiles);
    if (formik.errors.prescriptionImages) {
      formik.setFieldError('prescriptionImages', undefined);
    }

    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };


  const removeImage = (indexToRemove: number) => {
    const updatedFiles = formik.values.prescriptionImages.filter(
      (_, index) => index !== indexToRemove
    );
    const updatedPreviews = previews.filter(
      (_, index) => index !== indexToRemove
    );
    formik.setFieldValue("prescriptionImages", updatedFiles);
    setPreviews(updatedPreviews);
    if (imageRef.current) imageRef.current.value = "";
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-8">
      <div className="">
        <Label className="font-semibold text-base">
          Upload Prescriptions (Max 5, @2MB)
        </Label>
          <span className="font-semibold text-s">(only .jpg, .jpeg, .heic, .svg type allowed) </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 space-y-12">
          {previews.map((src, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={src}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover rounded-lg border"
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                type="button"
                onClick={() => removeImage(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {formik.values.prescriptionImages.length < 5 && (
            <Label
              htmlFor="prescriptionImages"
              className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer bg-muted hover:bg-muted/80"
            >
              <UploadCloud className="h-8 w-8 text-muted-foreground" />
              <span className="mt-2 text-xs text-center text-muted-foreground">
                Add Image
              </span>
            </Label>
          )}
        </div>
        <Input
          ref={imageRef}
          id="prescriptionImages"
          name="prescriptionImages"
          type="file"
          multiple
          className="hidden space-y-2"
          accept='image/*'
          onChange={handleImageChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.prescriptionImages &&
          typeof formik.errors.prescriptionImages === "string" && (
            <p className="text-xs text-destructive">
              {formik.errors.prescriptionImages}
            </p>
          )}
      </div>

      {/* Notes */}
      <div className="grid gap-2">
        <Label htmlFor="notes" className="font-semibold">
          Additional Notes
        </Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="e.g., Please provide the generic version of the medicine."
          value={formik.values.notes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      
      {/* Delivery Method */}
      <div className="grid gap-3">
        <Label className="font-semibold">Delivery Method</Label>
        <RadioGroup
          name="deliveryMethod"
          value={formik.values.deliveryMethod}
          onValueChange={(value) =>
            formik.setFieldValue("deliveryMethod", value)
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="delivery" id="delivery" />
            <Label htmlFor="delivery" className="font-normal">
              Ship to my address
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pickup" id="pickup" />
            <Label htmlFor="pickup" className="font-normal">
              Pick up at pharmacy
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Conditional: Delivery Address */}
      {formik.values.deliveryMethod === "delivery" && (
        <div className="grid gap-2 animate-in fade-in-0">
          <Label htmlFor="addressId" className="font-semibold">
            Delivery Address
          </Label>
          <Select
            name="addressId"
            value={formik.values.addressId}
            onValueChange={(value) => formik.setFieldValue("addressId", value)}
            disabled={isLoadingAddresses || !userAddresses || userAddresses.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder={
                isLoadingAddresses ? "Loading addresses..." : 
                !userAddresses || userAddresses.length === 0 ? "No address found" : "Select an address"
              } />
            </SelectTrigger>
            <SelectContent>
              {userAddresses?.map((addr: any) => (
                <SelectItem key={addr.id} value={addr.id}>
                  {addr.label} - {addr.fullAddress}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formik.touched.addressId && formik.errors.addressId && (
            <p className="text-xs text-destructive">{formik.errors.addressId}</p>
          )}
        </div>
      )}
      
      <div className="grid gap-2">
        <Label htmlFor="pharmacyId" className="font-semibold">
          {formik.values.deliveryMethod === "delivery"
            ? "Destination Pharmacy"
            : "Pickup Pharmacy"}
        </Label>
        <Select
          name="pharmacyId"
          value={formik.values.pharmacyId}
          onValueChange={(value) => formik.setFieldValue("pharmacyId", value)}
          disabled={isLoadingPharmacies || !pharmacies}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={
                isLoadingPharmacies
                  ? "Loading pharmacies..."
                  : "Select a pharmacy"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {pharmacies?.map((p: PharmacyWithDistance) => (
              <SelectItem key={p.id} value={p.id}>
                <div className="flex items-center justify-between w-full">
                  <span>{p.name}</span>
                  {p.distance && p.distance <= 10 && (
                    <span className="text-xs font-semibold text-primary flex items-center gap-1 ml-2">
                      <MapPin className="h-3 w-3" /> NEARBY
                    </span>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {formik.touched.pharmacyId && formik.errors.pharmacyId && (
          <p className="text-xs text-destructive">{formik.errors.pharmacyId}</p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Prescription"}
      </Button>
    </form>
  );
}