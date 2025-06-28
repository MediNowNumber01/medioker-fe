"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ProductImage } from "@/types/productImage";

interface DisplayImageProps {
  images: ProductImage[];
  productName: string;
}

export default function DisplayImage({ images, productName }: DisplayImageProps) {
  const [mainImage, setMainImage] = useState(
    images.find((img) => img.isThumbnail)?.imageUrl || images[0]?.imageUrl || "/placeholder.svg"
  );

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No Image</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
        <Image
          priority
          src={mainImage}
          alt={`Main image of ${productName}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image) => (
            <button
              key={image.id}
              className={`relative aspect-square w-full rounded-md overflow-hidden border-2 transition-all ${
                mainImage === image.imageUrl ? "border-primary" : "border-transparent"
              }`}
              onClick={() => setMainImage(image.imageUrl)}
            >
              <Image
                src={image.imageUrl}
                alt={`Thumbnail of ${productName}`}
                fill
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}