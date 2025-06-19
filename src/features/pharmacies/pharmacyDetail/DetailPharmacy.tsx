"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetDetailPharmacy } from "@/hooks/api/Pharmacy/useGetDetailPharmacy";
import { generateInitials } from "@/lib/generateInitials";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC } from "react";
import PharmacyInfo from "./components/PharmacyInfo";

interface PharmacyDetailProps {
  pharmacyId: string;
}

const PharmacyDetail: FC<PharmacyDetailProps> = ({ pharmacyId }) => {
  const { data: pharmacy, isError } = useGetDetailPharmacy(pharmacyId);
  if (isError) {
    return redirect("/superadmin/pharmacies");
  }

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
          </TabsList>
        </Tabs>
      </div>

      <PharmacyInfo pharmacyId={pharmacyId} />
    </section>
  );
};

export default PharmacyDetail;
