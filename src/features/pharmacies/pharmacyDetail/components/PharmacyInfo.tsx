"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDetailPharmacy } from "@/hooks/api/Pharmacy/useGetDetailPharmacy";
import { format } from "date-fns";
import { CalendarClock, CalendarPlus, Cog, MapPin, Power } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/generateInitials";
import useDeletePharmacy from "@/hooks/api/Pharmacy/useDeletePharmacy";

interface PharmacyInfoProps {
  pharmacyId: string;
}
const PharmacyInfo: FC<PharmacyInfoProps> = ({ pharmacyId }) => {
  const { data: pharmacy, isError } = useGetDetailPharmacy(pharmacyId);
  if (isError) {
    return redirect("/superadmin/pharmacies");
  }

  const status = pharmacy?.data.isOpen ? "Open" : "Closed";
  const createdAt = pharmacy?.data.createdAt
    ? format(new Date(pharmacy.data.createdAt), "dd MMM yyyy")
    : null;
  const updatedAt = pharmacy?.data.updatedAt
    ? format(new Date(pharmacy.data.updatedAt), "dd MMM yyyy")
    : null;

  const location = {
    lat: pharmacy?.data.lat ? pharmacy?.data.lat : 0,
    lng: pharmacy?.data.lng ? pharmacy?.data.lng : 0,
    detail: pharmacy?.data.detailLocation ? pharmacy?.data.detailLocation : "",
  };
  const mapEmbedUrl = `https://maps.google.com/maps?q=${location.lat},${location.lng}&hl=en&z=15&output=embed`;

  const { mutateAsync: deletePharmacy, isPending } = useDeletePharmacy();
  const handleDeletePharmacy = async () => {
    await deletePharmacy(pharmacyId);
  };
  return (
    <Card className=" py-4 px-2 md:px-4 md:space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-center md:justify-start">
            <h3>Pharmacy Status</h3>
          </CardTitle>
        </CardHeader>
        <CardContent className=" space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-muted-foreground">
              <Power className="w-4 h-4 mr-2" /> Status
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  className={cn(
                    pharmacy?.data.isOpen ? "bg-green-600" : "bg-red-500"
                  )}
                  variant={pharmacy?.data.isOpen ? "default" : "destructive"}
                >
                  <p>{pharmacy?.data.isOpen ? "Open" : "Closed"}</p>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {pharmacy?.data.isOpen
                    ? "This pharmacy is currently open."
                    : "assign admin to open the pharmacy."}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center text-muted-foreground">
              <CalendarPlus className="w-4 h-4 mr-2" /> Registered At
            </div>
            <p className="font-medium text-foreground">{createdAt}</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center text-muted-foreground">
              <CalendarClock className="w-4 h-4 mr-2" /> Last Updated
            </div>
            <p className="font-medium text-foreground">{updatedAt}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-center md:justify-start">
            <MapPin className="w-8 h-8 mr-2 text-muted-foreground" />
            <h3>Detail Location</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-foreground">
                {location.detail || "No specific location details provided."}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                <b>Latitude:</b> {location.lat}
              </span>
              <span>|</span>
              <span>
                <b>Longitude:</b> {location.lng}
              </span>
            </div>
          </div>
          <div className="aspect-video max-h-[300px]  mx-auto rounded-lg overflow-hidden border">
            <iframe
              src={mapEmbedUrl}
              className="w-full h-full "
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-center md:justify-start">
            <Cog className="w-8 h-8 mr-2 text-muted-foreground" />
            <div>
              <h3>Action</h3>
              <p className="text-muted-foreground">Change Pharmacy Details.</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button className="w-full" variant="outline">
            <Link
              href={`/superadmin/pharmacies/${pharmacyId}/update`}
              className="w-full"
            >
              Adjust Pharmacy Details
            </Link>
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="w-full hover:cursor-pointer"
                variant="destructive"
              >
                Delete Pharmacy
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Pharmacy</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this pharmacy? This action
                  cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button disabled={isPending} variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  disabled={isPending || pharmacy?.data.isMain}
                  variant="destructive"
                  onClick={handleDeletePharmacy}
                >
                  Confirm Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </Card>
  );
};

export default PharmacyInfo;
