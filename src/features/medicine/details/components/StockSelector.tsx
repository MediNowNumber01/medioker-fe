import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const StockSelector = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Select Pharmacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={`border flex gap-4 rounded-lg p-4 cursor-pointer bg-muted `}
          >
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-14 w-14">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-muted-foreground">nama apotek</div>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                detail alamat apotek
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockSelector;
