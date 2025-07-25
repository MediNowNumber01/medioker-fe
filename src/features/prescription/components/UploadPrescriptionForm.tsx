"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import useGetUserAddresses from "@/hooks/api/address/useGetUserAddresses";
import useGetPharmacies from "@/hooks/api/Pharmacy/useGetPharmacies";
import useCreatePrescription from "@/hooks/api/prescription/useCreatePrescription";
import useAxios from "@/hooks/useAxios";
import { haversineDistance } from "@/lib/haversineDistance";
import { Pharmacy } from "@/types/semuaNgerapiinyaNtar";
import type { UserAddress } from "@/types/userAddress";
import { useFormik } from "formik";
import {
  CheckCircle2,
  ChevronsUpDown,
  FileImage,
  Home,
  Store,
  Trash2,
  Truck,
  UploadCloud,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { UploadPrescriptionSchema } from "../schemas";
import { AddressSelectionModal } from "./AddressSelectionModal";
import { PrescriptionPharmacyCard } from "./PrescriptionPharmacyCard";

type PharmacyWithDistance = Pharmacy & { distance?: number };
export function UploadPrescriptionForm() {
  useAxios();
  const { data: session } = useSession();
  const [activePreviewIndex, setActivePreviewIndex] = useState<number | null>(
    null
  );

  const { mutateAsync: createPrescription, isPending } =
    useCreatePrescription();
  const imageRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<{
    latitude: string;
    longitude: string;
  } | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(
    null
  );
  const [selectionReason, setSelectionReason] = useState<
    "nearest" | "main" | null
  >(null);
  const [selectedPharmacy, setSelectedPharmacy] =
    useState<PharmacyWithDistance | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isPharmacyModalOpen, setIsPharmacyModalOpen] = useState(false);
  const { data: userAddresses, isLoading: isLoadingAddresses } =
    useGetUserAddresses();
  const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "image/heic",
  ];

  const { data: rawPharmacies, isLoading: isLoadingPharmacies } =
    useGetPharmacies({
      take: 1000,
    });
  const [processedPharmacies, setProcessedPharmacies] = useState<
    PharmacyWithDistance[]
  >([]);

  const isVerified = session?.user?.isVerified;
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setUserLocation({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          }),
        () => setUserLocation(null)
      );
    } else {
      setUserLocation(null);
    }
  }, []);

  useEffect(() => {
    if (!rawPharmacies?.data) return;

    let pharmacies = [...rawPharmacies.data];

    if (userLocation) {
      pharmacies = pharmacies
        .map((p) => ({
          ...p,
          distance: haversineDistance(
            parseFloat(userLocation.latitude),
            parseFloat(userLocation.longitude),
            parseFloat(p.lat),
            parseFloat(p.lng)
          ),
        }))
        .sort((a, b) => a.distance - b.distance);
    }
    setProcessedPharmacies(pharmacies);
  }, [rawPharmacies, userLocation]);

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
  });

  useEffect(() => {
    if (processedPharmacies.length === 0 || selectedPharmacy) return;

    let pharmacyToSelect: PharmacyWithDistance | undefined;

    if (userLocation) {
      pharmacyToSelect = processedPharmacies[0];
      setSelectionReason("nearest");
    } else {
      pharmacyToSelect = processedPharmacies.find((p) => p.isMain);
      setSelectionReason("main");
    }

    if (pharmacyToSelect) {
      setSelectedPharmacy(pharmacyToSelect);
      formik.setFieldValue("pharmacyId", pharmacyToSelect.id);
    }
  }, [
    processedPharmacies,
    selectedPharmacy,
    userLocation,
    formik.setFieldValue,
  ]);

  useEffect(() => {
    if (userAddresses && !selectedAddress) {
      const primaryAddress = userAddresses.find(
        (addr: UserAddress) => addr.isPrimary
      );
      if (primaryAddress) {
        setSelectedAddress(primaryAddress);
        formik.setFieldValue("addressId", primaryAddress.id);
      }
    }
  }, [userAddresses, selectedAddress, formik.setFieldValue]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const currentFiles = formik.values.prescriptionImages;
    if (currentFiles.length + files.length > 5) {
      toast.error("You can upload a maximum of 5 images.");
      return;
    }

    const newFiles = Array.from(files);
    const invalidFiles = newFiles.filter(
      (file) => !ALLOWED_IMAGE_TYPES.includes(file.type)
    );
    if (invalidFiles.length > 0) {
      formik.setFieldError(
        "prescriptionImages",
        `Invalid file type: ${invalidFiles[0].name}. Please upload images only.`
      );
      toast.error("Invalid file type detected.");
      return;
    }

    const validFiles = newFiles.filter((file) => file.size <= 2 * 1024 * 1024);
    if (validFiles.length !== newFiles.length) {
      toast.error("Some files were too large (max 2MB) and were not added.");
    }

    const updatedFiles = [...currentFiles, ...validFiles];
    formik.setFieldValue("prescriptionImages", updatedFiles);
    if (formik.errors.prescriptionImages) {
      formik.setFieldError("prescriptionImages", undefined);
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
  const handlePreviewClick = (index: number) => {
    setActivePreviewIndex(activePreviewIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <Card className="border-2 border-dashed border-primary/20 bg-primary/5">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileImage className="h-5 w-5 text-primary" />
              Upload Prescription Images
              <Badge variant="secondary" className="ml-auto">
                {formik.values.prescriptionImages.length}/5
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {previews.map((src, index) => (
                <div
                  key={index}
                  className="relative group "
                  onClick={() => handlePreviewClick(index)}
                >
                  <div className="aspect-square rounded-xl border-2 border-border overflow-hidden bg-muted">
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105 overflow-hidden"
                    />
                  </div>
                  <Button
                    size="icon"
                    variant="destructive"
                    className={`absolute -top-2 -right-2 h-7 w-7 rounded-full shadow-lg transition-opacity z-10 ${
                      activePreviewIndex === index
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                    type="button"
                    onClick={() => removeImage(index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              {formik.values.prescriptionImages.length < 5 && (
                <Label
                  htmlFor="prescriptionImages"
                  className="aspect-square border-2 border-dashed border-primary/30 rounded-xl flex flex-col items-center justify-center cursor-pointer bg-background hover:bg-primary/10 transition-all duration-200 hover:border-primary/50"
                >
                  <UploadCloud className="h-8 w-8 text-primary/60 mb-2" />
                  <span className="text-xs font-medium text-primary/80">
                    Add Image
                  </span>
                </Label>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" />
              <span>
                Supported: JPG, JPEG, PNG, HEIC • Max 1MB each • Up to 5 images
              </span>
            </div>
            <Input
              ref={imageRef}
              id="prescriptionImages"
              name="prescriptionImages"
              type="file"
              multiple
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.prescriptionImages &&
              typeof formik.errors.prescriptionImages === "string" && (
                <p className="text-sm text-destructive flex items-center gap-2">
                  <span className="h-1 w-1 bg-destructive rounded-full" />
                  {formik.errors.prescriptionImages}
                </p>
              )}
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Any special instructions for the pharmacist..."
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="min-h-[120px] resize-none"
              />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Delivery & Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Choose delivery method
                </Label>
                <RadioGroup
                  name="deliveryMethod"
                  value={formik.values.deliveryMethod}
                  onValueChange={(value) =>
                    formik.setFieldValue("deliveryMethod", value)
                  }
                  className="grid grid-cols-2 gap-4"
                >
                  <Label
                    htmlFor="delivery"
                    className={`flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formik.values.deliveryMethod === "delivery"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value="delivery" id="delivery" />
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      <span className="font-medium">Delivery</span>
                    </div>
                  </Label>
                  <Label
                    htmlFor="pickup"
                    className={`flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formik.values.deliveryMethod === "pickup"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value="pickup" id="pickup" />
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4" />
                      <span className="font-medium">Pickup</span>
                    </div>
                  </Label>
                </RadioGroup>
              </div>

              <Separator />

              {formik.values.deliveryMethod === "delivery" && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Delivery address
                  </Label>
                  <Dialog
                    open={isAddressModalOpen}
                    onOpenChange={setIsAddressModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer hover:shadow-md transition-all duration-200 border-2 hover:border-primary/50">
                        <CardContent className="p-4">
                          {isLoadingAddresses ? (
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
                              <div className="space-y-2 flex-1">
                                <div className="h-4 bg-muted rounded animate-pulse" />
                                <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
                              </div>
                            </div>
                          ) : selectedAddress ? (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                  <Home className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {selectedAddress.label}
                                  </p>
                                  <p className="text-sm text-muted-foreground line-clamp-1">
                                    {selectedAddress.fullAddress}
                                  </p>
                                </div>
                              </div>
                              <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                                  <Home className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <p className="text-muted-foreground">
                                  Select delivery address
                                </p>
                              </div>
                              <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Select Delivery Address</DialogTitle>
                      </DialogHeader>
                      <AddressSelectionModal
                        currentAddressId={formik.values.addressId}
                        onAddressSelect={(addressId) => {
                          const newAddress = userAddresses?.find(
                            (a: UserAddress) => a.id === addressId
                          );
                          if (newAddress) {
                            setSelectedAddress(newAddress);
                            formik.setFieldValue("addressId", addressId);
                          }
                          setIsAddressModalOpen(false);
                        }}
                        onClose={() => setIsAddressModalOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>
                  {formik.touched.addressId && formik.errors.addressId && (
                    <p className="text-sm text-destructive flex items-center gap-2">
                      <span className="h-1 w-1 bg-destructive rounded-full" />
                      {formik.errors.addressId}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  {formik.values.deliveryMethod === "delivery"
                    ? "Select pharmacy"
                    : "Pickup location"}
                </Label>
                <Dialog
                  open={isPharmacyModalOpen}
                  onOpenChange={setIsPharmacyModalOpen}
                >
                  <DialogTrigger asChild>
                    <div className="cursor-pointer">
                      <PrescriptionPharmacyCard
                        pharmacy={selectedPharmacy}
                        isLoading={isLoadingPharmacies && !selectedPharmacy}
                        isNearest={selectionReason === "nearest"}
                        isMain={selectionReason === "main"}
                        isModalTrigger
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Select Pharmacy</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2 max-h-[60vh] overflow-y-auto p-1">
                      {/* 4. Perbarui JSX untuk menggunakan data yang sudah diproses */}
                      {processedPharmacies.map((p) => (
                        <div
                          key={p.id}
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedPharmacy(p);
                            formik.setFieldValue("pharmacyId", p.id);
                            setSelectionReason(null);
                            setIsPharmacyModalOpen(false);
                          }}
                        >
                          <PrescriptionPharmacyCard
                            pharmacy={p}
                            isNearest={
                              p.id === processedPharmacies[0]?.id &&
                              !!userLocation
                            }
                            isMain={p.isMain}
                          />
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
                {formik.touched.pharmacyId && formik.errors.pharmacyId && (
                  <p className="text-sm text-destructive flex items-center gap-2">
                    <span className="h-1 w-1 bg-destructive rounded-full" />
                    {formik.errors.pharmacyId}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-base font-medium"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting Prescription...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Submit Prescription
                </div>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
