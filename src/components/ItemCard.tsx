"use client";
import { formatPrice } from "@/app/utils/formatPrice";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types/semuaNgerapiinyaNtar";
import { Package } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";

import { UnitProduct } from "@/types/unitProduct";
import Link from "next/link";
import DisplayCategory from "./DisplayCategory";

interface ItemCardProps {
  className?: string;
  product: Product;
  navigate?: string;
}

const ItemCard: FC<ItemCardProps> = ({ className, product, navigate }) => {
  const [expanded, setExpanded] = useState(false);

  const imageUrl =
    product.ProductImage?.[0]?.imageUrl ?? "/images/placeholder-product.png";
  const stockQuantity = product.Stock?.[0]?.quantity ?? 0;

  const getStockStatus = (stock: number) => {
    if (stock === 0)
      return {
        text: "Out of Stock",
        color: "text-red-600",
        bgColor: "bg-red-50",
      };
    if (stock < 20)
      return {
        text: "Low Stock",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      };
    return {
      text: "In Stock",
      color: "text-green-600",
      bgColor: "bg-green-50",
    };
  };

  const rangePrice = (units: UnitProduct[]) => {
    if (!units || units.length === 0) return "Rp 0";
    if (units.length === 1) return formatPrice(units[0].price);
    const prices = units.map((unit) => unit.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    if (minPrice === maxPrice) return formatPrice(minPrice);
    return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
  };

  const stockInfo = getStockStatus(stockQuantity);

  return (
    <Link href={navigate || "#"} className={`${className} h-full`}>
      <Card className="p-0 relative gap-0 h-full overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-200">
        <div className="relative w-full">
          <Image
            priority
            src={imageUrl}
            alt={`Product image ${product.name}`}
            width={500}
            height={500}
            className="object-contain aspect-square"
            onError={(e) => {
              e.currentTarget.src = "/images/placeholder-product.png";
            }}
          />
        </div>

        <CardHeader className="p-2 pb-0">
          <CardTitle className="text-lg font-semibold ">
            <div className="line-clamp-3 md:line-clamp-2">
              {product.name || `Product Name `}
            </div>
            <div
              className={`font-medium text-sm ${(() => {
                switch (product.acquisition) {
                  case "GENERIK":
                    return "text-chart-1";
                  case "NON_GENERIK":
                    return "text-chart-2";
                  case "HERBAL":
                    return "text-chart-3";
                  default:
                    return "text-chart-4";
                }
              })()}`}
            >
              {(product.acquisition || "")
                .split("_")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 pt-0 flex-grow">
          <div className="h-fit flex flex-wrap gap-2">
            {product.ProductCategory?.map((ProductCategory, idx, self) => {
              if (idx > 1 && !expanded) {
                if (idx === 2) {
                  return (
                    <Badge
                      variant="secondary"
                      key={ProductCategory.category?.id || idx}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setExpanded(!expanded);
                      }}
                      className={`text-xs h-fit px-2 py-1 z-20 w-fit cursor-pointer`}
                    >
                      +{self.length - 2} more
                    </Badge>
                  );
                } else {
                  return null;
                }
              } else {
                return (
                  <DisplayCategory
                    className="cursor-pointer"
                    type="badge"
                    key={ProductCategory.category?.id || idx}
                    id={ProductCategory.category?.id}
                  />
                );
              }
            })}
          </div>
        </CardContent>
        <CardFooter className="p-2 m-0 flex flex-col items-start gap-2">
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${stockInfo.bgColor} ${stockInfo.color}`}
          >
            <Package className="h-3 w-3 inline mr-1" />
            {stockInfo.text} ({stockQuantity})
          </div>
          <div className="text-lg font-semibold">
            {rangePrice(product.UnitProduct)}
          </div>
        </CardFooter>
        <div
          className={`rounded-full ${
            product.golongan === "OBAT_BEBAS"
              ? "bg-green-500"
              : product.golongan === "OBAT_KERAS"
              ? "bg-red-500"
              : "bg-blue-500"
          } p-0 absolute top-1 right-1 aspect-square w-[2rem] border-2 border-black`}
        ></div>
      </Card>
    </Link>
  );
};

export default ItemCard;
