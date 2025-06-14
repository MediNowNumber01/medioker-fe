import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardTitle } from "@/components/ui/card";
import { EditIcon, MapPin } from "lucide-react";
import { FC } from "react";

interface PharmacySelectorProps {
  className?: string;
}

const PharmacySelector: FC<PharmacySelectorProps> = ({ className }) => {
  return (
    <div className={className}>
      <Card className="px-4 py-2 mb-4 gap-2  ">
        <CardTitle className=" flex items-center gap-2 text-[1.25rem] font-semibold">
          <MapPin className="h-5 w-5" />
          Select Pharmacy
        </CardTitle>
        <Card className="p-2 gap-2 relative ">
          <div className="flex flex-row md:flex-col lg:flex-row items-center gap-2">
            <Avatar className="h-14 w-14">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="md:w-full font-medium">
              Nama Pharmacy yang dipilih
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed debitis
            recusandae totam laborum mollitia repellat voluptatem iste officia
            ab maiores!
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default PharmacySelector;
