"use client";
import { Product, UnitProduct } from "@/types/semuaNgerapiinyaNtar";
import { formatPrice } from "@/app/utils/formatPrice";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import DisplayCategory from "./DisplayCategory";

interface ItemCardProps {
  className?: string;
  product: Product;
  navigate?: string;
}
const ItemCard: FC<ItemCardProps> = ({ className, product, navigate }) => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
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
    if (units.length === 0) return "Rp 0";
    if (units.length === 1) return formatPrice(units[0].price);
    const prices = units.map((unit) => unit.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    if (minPrice === maxPrice) return formatPrice(minPrice);
    return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
  };
  const handleClick = () => {
    navigate && router.push(navigate);
  };

  return (
    <div className={`${className} hover:cursor-pointer`}>
      <Card className="p-0 relative gap-0 h-full overflow-hidden">
        <div onClick={handleClick} className="relative w-full">
          <Image
            priority
            src={product.ProductImage[0].imageUrl || `placeholder.svg`}
            alt={`Product image ${product.name}`}
            width={500}
            height={500}
            className="object-contain aspect-square"
          />
        </div>

        <CardHeader onClick={handleClick} className="p-2 pb-0">
          <CardTitle className="text-lg font-semibold ">
            <div className="line-clamp-3 md:line-clamp-2">
              {product.name || `Product Name `}
            </div>
            <div
              className={`font-medium 
                          ${(() => {
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
                          })()}
                          text-sm`}
            >
              {product.acquisition
                .split("_")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join("")}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 pt-0  h-full">
          <div className="h-fit flex flex-wrap gap-2 hover:cursor-default">
            {product.ProductCategory?.map((ProductCategory, idx, self) => {
              if (idx > 1 && !expanded) {
                if (idx === 2) {
                  return (
                    <Badge
                      variant="secondary"
                      key={ProductCategory.id + ProductCategory.category?.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpanded(!expanded);
                      }}
                      className={`text-xs h-fit px-2 py-1 z-20 w-fit hover:cursor-pointer`}
                    >
                      +{self.length - 2} more
                    </Badge>
                  );
                } else {
                  return null; // Skip all other categories if expanded is false
                }
              } else
                return (
                  <DisplayCategory
                    className="hover:cursor-pointer"
                    type="badge"
                    key={ProductCategory.id + ProductCategory.category?.id}
                    id={ProductCategory.category?.id}
                  />
                );
            })}
          </div>
          <div className="h-full"></div>
        </CardContent>
        <CardFooter
          onClick={handleClick}
          className="p-2 m-0 flex flex-col items-start gap-2"
        >
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              getStockStatus(product.Stock[0].quantity).bgColor
            } ${getStockStatus(product.Stock[0].quantity).color}`}
          >
            <Package className="h-3 w-3 inline mr-1" />
            {getStockStatus(product.Stock[0].quantity).text} (
            {product.Stock[0].quantity})
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
    </div>
  );
};

export default ItemCard;
