'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadPrescriptionForm } from "./components/UploadPrescriptionForm";

export default function UploadPrescriptionPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Upload Doctor's Prescription</CardTitle>
          <CardDescription>
            Submit your prescription image, and we'll prepare the medicine for you. Fast and easy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UploadPrescriptionForm />
        </CardContent>
      </Card>
    </div>
  );
}