"use client";

import { ProductImage } from "@/types/semuaNgerapiinyaNtar";
import Image from "next/image";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

const dummyImage: string[] = [
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
];

interface DisplayImageProps {
  productImage?: ProductImage[];
}
const DisplayImage = () => {
  const [productImage, setProductImage] = useState<string>(dummyImage[0]);

  return (
    <div className="space-y-4">
      <div className="relative bg-white rounded-lg border p-8">
        <Image
          src={productImage || "/placeholder.svg"}
          alt={"product.name"}
          width={400}
          height={400}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Selector */}
      <div className={`flex gap-2`}>
        {dummyImage.map((image, i) => (
          <div
            key={i}
            className="aspect-square grow bg-card rounded border p-2"
          >
            <Image
              src={image}
              onClick={() => setProductImage(image)}
              alt={`Product view ${i}`}
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayImage;
