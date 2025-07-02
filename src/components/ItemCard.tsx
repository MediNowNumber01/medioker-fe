"use client"

import { formatPrice } from "@/app/utils/formatPrice"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/item-card"
import type { Product } from "@/types/semuaNgerapiinyaNtar"
import { Package, Tag } from "lucide-react"
import Image from "next/image"
import { type FC, useState } from "react"
import type { UnitProduct } from "@/types/unitProduct"
import Link from "next/link"
import DisplayCategory from "./DisplayCategory"

interface ItemCardProps {
  className?: string
  product: Product
  navigate?: string
}

const ItemCard: FC<ItemCardProps> = ({ className, product, navigate }) => {
  const [expanded, setExpanded] = useState(false)
  const imageUrl = product.ProductImage?.[0]?.imageUrl ?? "/images/placeholder-product.png"
  const stockQuantity = product.Stock?.[0]?.quantity ?? 0

  const getStockStatus = (stock: number) => {
    if (stock === 0)
      return {
        text: "Habis",
        color: "text-white",
        bgColor: "bg-red-500/90",
        dotColor: "bg-white",
      }
    if (stock < 20)
      return {
        text: "Stok Terbatas",
        color: "text-white",
        bgColor: "bg-amber-500/90",
        dotColor: "bg-white",
      }
    return {
      text: "Tersedia",
      color: "text-white",
      bgColor: "bg-green-500/90",
      dotColor: "bg-white",
    }
  }

  const rangePrice = (units: UnitProduct[]) => {
    if (!units || units.length === 0) return "Rp 0"
    if (units.length === 1) return formatPrice(units[0].price)

    const prices = units.map((unit) => unit.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)

    if (minPrice === maxPrice) return formatPrice(minPrice)
    return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`
  }

  const getAcquisitionColor = (acquisition: string) => {
    switch (acquisition) {
      case "GENERIK":
        return "text-blue-700 bg-blue-100"
      case "NON_GENERIK":
        return "text-purple-700 bg-purple-100"
      case "HERBAL":
        return "text-green-700 bg-green-100"
      default:
        return "text-gray-700 bg-gray-100"
    }
  }

  const getGolonganInfo = (golongan: string) => {
    switch (golongan) {
      case "OBAT_BEBAS":
        return { color: "bg-green-500", label: "Obat Bebas" }
      case "OBAT_KERAS":
        return { color: "bg-red-500", label: "Obat Keras" }
      default:
        return { color: "bg-blue-500", label: "Obat Terbatas" }
    }
  }

  const stockInfo = getStockStatus(stockQuantity)
  const golonganInfo = getGolonganInfo(product.golongan)

  return (
    <Link href={navigate || "#"} className={`${className} h-full block group`}>
      <Card className="h-full overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] border-0 rounded-xl bg-white shadow-sm">
        <div className="relative overflow-hidden rounded-t-xl">
          <Image
            priority
            src={imageUrl || "/placeholder.svg"}
            alt={`Product image ${product.name}`}
            width={400}
            height={240}
            className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = "/images/placeholder-product.png"
            }}
          />

          <div className="absolute top-3 left-3">
            <div
              className={`${golonganInfo.color} w-7 h-7 rounded-full border border-white/50`}
              title={golonganInfo.label}
            />
          </div>

          <div className="absolute bottom-3 left-3">
            <div
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${stockInfo.bgColor} ${stockInfo.color} backdrop-blur-sm`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${stockInfo.dotColor}`} />
              {stockInfo.text}
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-grow p-4">
          <div className="mb-2">
            <h3 className="font-semibold text-base leading-tight line-clamp-2 text-gray-900 mb-1">
              {product.name || "Product Name"}
            </h3>

            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Package className="w-3 h-3" />
              <span>Stok: {stockQuantity}</span>
            </div>
          </div>

          {product.acquisition && (
            <div className="mb-3">
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${getAcquisitionColor(product.acquisition)}`}
              >
                <Tag className="w-3 h-3" />
                {product.acquisition
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(" ")}
              </span>
            </div>
          )}

          {product.ProductCategory && product.ProductCategory.length > 0 && (
            <div className="mb-4 flex-grow">
              <div className="flex flex-wrap gap-1">
                {product.ProductCategory.map((ProductCategory, idx, self) => {
                  if (idx > 1 && !expanded) {
                    if (idx === 2) {
                      return (
                        <Badge
                          variant="outline"
                          key={ProductCategory.category?.id || idx}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setExpanded(!expanded)
                          }}
                          className="text-xs px-2 py-0.5 cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                          +{self.length - 2}
                        </Badge>
                      )
                    } else {
                      return null
                    }
                  } else {
                    return (
                      <DisplayCategory
                        className="cursor-pointer text-xs"
                        type="badge"
                        key={ProductCategory.category?.id || idx}
                        id={ProductCategory.category?.id}
                      />
                    )
                  }
                })}
              </div>
            </div>
          )}

          {/* Price - Bottom */}
          <div className="mt-auto">
            <div className="text-lg font-bold text-gray-900">{rangePrice(product.UnitProduct)}</div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default ItemCard
