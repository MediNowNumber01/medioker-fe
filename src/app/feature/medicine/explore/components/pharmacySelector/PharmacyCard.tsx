import { Pharmacy } from "@/app/types/semuaNgerapiinyaNtar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { FC } from "react";

interface PharmacyCardProps {
  className?: string;
  pharmacy?: Pharmacy | null;
  onClick?: () => void;
  fixedLayout?: boolean;
}

const PharmacyCard: FC<PharmacyCardProps> = ({
  className,
  pharmacy,
  onClick,
  fixedLayout,
}) => {
  return (
    <Card
      className={`p-2 gap-2 relative hover:cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div
        className={`flex ${
          fixedLayout ? "flex-row" : "md:flex-col lg:flex-row"
        } items-center gap-2`}
      >
        <Avatar className="h-14 w-14">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>MN</AvatarFallback>
        </Avatar>
        <div
          className={`md:w-full font-medium text-lg ${
            fixedLayout ? "text-left" : ""
          }`}
        >
          {pharmacy?.name}
          <div className="w-fit">
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${pharmacy?.lat},${pharmacy?.lng}`}
              target="_blank"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={`text-left text-sm text-blue-400 hover:underline hover:cursor-pointer ${
                pharmacy?.lat && pharmacy?.lng ? "" : "hidden"
              }`}
            >{`${pharmacy?.lat} , ${pharmacy?.lng}`}</Link>
          </div>
        </div>
      </div>
      <div className="text-sm text-muted-foreground text-left">
        {pharmacy?.detailLocation}
      </div>
    </Card>
  );
};

export default PharmacyCard;
