"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetDetailPharmacy } from "@/hooks/api/Pharmacy/useGetDetailPharmacy";
import { generateInitials } from "@/lib/generateInitials";
import { cn } from "@/lib/utils";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { format } from "date-fns";
import {
  ArrowLeft,
  CalendarClock,
  CalendarPlus,
  Cog,
  MapPin,
  Power,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC } from "react";

interface PharmacyDetailProps {
  pharmacyId: string;
}

const PharmacyDetail: FC<PharmacyDetailProps> = ({ pharmacyId }) => {
  const { data: pharmacy, isError } = useGetDetailPharmacy(pharmacyId);
  if (isError) {
    return redirect("/superadmin/pharmacies");
  }
  const status = pharmacy?.data.isOpen ? "Open" : "Closed";
  const createdAt = pharmacy?.data.createdAt
    ? format(new Date(pharmacy.data.createdAt), "PPpp")
    : null;
  const updatedAt = pharmacy?.data.updatedAt
    ? format(new Date(pharmacy.data.updatedAt), "PPpp")
    : null;

  const location = {
    lat: pharmacy?.data.lat ? pharmacy?.data.lat : 0,
    lng: pharmacy?.data.lng ? pharmacy?.data.lng : 0,
    detail: pharmacy?.data.detailLocation ? pharmacy?.data.detailLocation : "",
  };
  const mapEmbedUrl = `https://maps.google.com/maps?q=${location.lat},${location.lng}&hl=en&z=15&output=embed`;

  return (
    <section className="container mx-auto flex flex-col gap-4 p-2 md:space-y-4">
      <Link
        href={"/superadmin/pharmacies"}
        className="flex items-center hover:font-medium hover:cursor-pointer text-muted-foreground"
      >
        <ArrowLeft />
        <span className="ml-2 ">Back to Dashboard </span>
      </Link>
      <div>
        <h1 className="text-primary">Detail Pharmacy</h1>
        <p className="text-muted-foreground">
          Manage and view details for the selected pharmacy.
        </p>
      </div>

      <Card className="text-center items-center justify-center p-4 gap-0">
        <div className="relative flex items-center justify-center">
          <Avatar className="w-24 h-24 md:w-32 md:h-32 border ">
            <AvatarImage src={pharmacy?.data.picture} />
            <AvatarFallback className="w-full h-full flex items-center justify-center">
              {generateInitials(pharmacy?.data.name)}
            </AvatarFallback>
          </Avatar>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                className={cn(
                  "absolute bottom-0 right-0 ",
                  pharmacy?.data.isOpen ? "bg-green-600" : "bg-red-500"
                )}
                variant={pharmacy?.data.isOpen ? "default" : "destructive"}
              >
                {pharmacy?.data.isOpen ? "Open" : "Closed"}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {pharmacy?.data.isOpen
                  ? "This pharmacy is currently open."
                  : "assigned admin to open the pharmacy."}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <>
          <h2 className=" mt-2">{pharmacy?.data.name}</h2>
          <p className="text-muted-foreground">
            <span>ID: </span>
            {pharmacy?.data.id}
          </p>
          <div>
            {pharmacy?.data.isMain && (
              <div className="flex items-center gap-2 text-green-600 font-medium my-2">
                <CheckBadgeIcon className="h-8 w-8 relative" />
                Main Branch
              </div>
            )}
          </div>
        </>
      </Card>
      <div>
        <Tabs defaultValue="overview">
          <TabsList className="flex w-full gap-6">
            <TabsTrigger value="overview" className="w-full">
              Details
            </TabsTrigger>
            <TabsTrigger value="admins" className="w-full">
              Admins
            </TabsTrigger>
            <TabsTrigger value="medicines" className="w-full">
              Stock Log
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

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
              <Badge
                variant={status === "Open" ? "default" : "destructive"}
                className={status === "Open" ? "bg-green-600" : "bg-red-600"}
              >
                {status}
              </Badge>
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
                <p className="text-muted-foreground">
                  Change Pharmacy Details.
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full" variant="outline">
              <Link href={`/superadmin/pharmacies/${pharmacyId}/edit`}>
                Edit Pharmacy
              </Link>
            </Button>
            <Button className="w-full" variant="destructive">
              Delete Pharmacy
            </Button>
          </CardContent>
        </Card>
      </Card>
    </section>
  );
};

export default PharmacyDetail;
