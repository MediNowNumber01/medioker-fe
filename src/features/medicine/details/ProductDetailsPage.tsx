"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProductDetails } from "@/hooks/api/Products/useGetProductDetails";
import { Shield } from "lucide-react";
import ActionCard from "./components/ActionCard";
import DisplayImage from "./components/DisplayImage";
import DisplayInfo from "./components/DisplayInfo";

// The Skeleton component remains unchanged and is a great placeholder.
const ProductDetailsPageSkeleton = () => (
    <div className="container mx-auto px-4 py-6">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="grid md:grid-cols-2 gap-6">
            <Skeleton className="w-full aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-10 w-1/2" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
        <div className="lg:col-span-3 mt-8">
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    </div>
);

export default function ProductDetailsPage({ slug }: { slug: string }) {
  const { data: product, isLoading, error } = useGetProductDetails(slug);

  if (isLoading) return <ProductDetailsPageSkeleton />;
  if (error || !product) return <div className="text-center py-20">Product not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <DisplayImage images={product.ProductImage} productName={product.name} />
              
              <div className="space-y-4">
                <div>
                  <Badge variant="outline">{product.ProductCategory[0]?.category.name || "General"}</Badge>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
                  <p className="text-muted-foreground">{product.brand}</p>
                </div>
                {product.needsPrescription && (
                  <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-3 rounded-r-lg flex items-start gap-3">
                    <Shield className="h-5 w-5 mt-0.5 shrink-0" />
                    <p className="text-sm">This medicine requires a doctor's prescription.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="block lg:hidden">
                <ActionCard product={product} />
            </div>

            <div className="mt-8">
                <DisplayInfo product={product} />
            </div>
          </div>

          <div className="hidden lg:block space-y-6">
            <ActionCard product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}