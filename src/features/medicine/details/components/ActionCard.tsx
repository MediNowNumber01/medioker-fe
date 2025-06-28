"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Product } from "@/types/product";
import { Minus, Package, Plus, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState, useMemo } from "react";
import { toast } from "sonner";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);

export default function ActionCard({ product }: { product: Product }) {
  const { data } = useSession();

  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(
    product.UnitProduct.find((u) => u.isMain)?.id ||
      product.UnitProduct[0]?.id ||
      null
  );
  const [quantity, setQuantity] = useState(1);

  const selectedUnit = useMemo(() => {
    return product.UnitProduct.find((u) => u.id === selectedUnitId);
  }, [selectedUnitId, product.UnitProduct]);

  const totalStock =
    product.Stock?.reduce((sum, s) => sum + s.quantity, 0) || 0;

  const handleAddToCart = () => {
    if (!selectedUnitId) {
      toast.error("Please select a unit type.");
      return;
    }
    toast.success(
      `${quantity} x ${product.name} (${selectedUnit?.name}) added to cart!`
    );
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div>
          <Label className="block text-sm font-medium mb-2">Select Unit</Label>
          <RadioGroup
            value={selectedUnitId || ""}
            onValueChange={setSelectedUnitId}
          >
            <div className="grid grid-cols-2 gap-2">
              {product.UnitProduct.map((unit) => (
                <Label
                  key={unit.id}
                  htmlFor={`unit-${unit.id}`}
                  className={`border rounded-md p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${
                    selectedUnitId === unit.id
                      ? "border-primary ring-2 ring-primary/50"
                      : "border-border"
                  }`}
                >
                  <RadioGroupItem
                    value={unit.id}
                    id={`unit-${unit.id}`}
                    className="sr-only"
                  />
                  <span className="font-semibold">{unit.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatPrice(unit.price)}
                  </span>
                </Label>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="block text-sm font-medium mb-2">Quantity</Label>
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 font-semibold min-w-[60px] text-center">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity((q) => Math.min(totalStock, q + 1))}
                disabled={quantity >= totalStock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Package className="h-4 w-4" />
              <span>Stock: {totalStock}</span>
            </div>
          </div>
        </div>
        {data?.user.isVerified === "false" && (
            <Button size="lg" className="w-full" disabled>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Please verify your email to add to cart
            </Button>
          ) && (
            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={totalStock === 0}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {totalStock > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
          )}
      </CardContent>
    </Card>
  );
}
