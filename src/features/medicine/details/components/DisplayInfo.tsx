"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types/product";

export default function DisplayInfo({ product }: { product: Product }) {
  return (
    <Card>
      <CardContent className="p-0">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="side-effects">Side Effects</TabsTrigger>
          </TabsList>
          <div className="p-6 text-sm text-muted-foreground space-y-4">
            <TabsContent value="description">
              <h3 className="font-semibold text-foreground mb-2">Indication</h3>
              <p>{product.indication}</p>
              <h3 className="font-semibold text-foreground mt-4 mb-2">
                Composition
              </h3>
              <p>{product.composition}</p>
            </TabsContent>
            <TabsContent value="details">
              <div className="space-y-2">
                <p>
                  <strong>Brand:</strong> {product.brand}
                </p>
                <p>
                  <strong>Dosage:</strong> {product.dose}
                </p>
                <p>
                  <strong>Packaging:</strong>{" "}
                  {product.UnitProduct.map((u) => u.name).join(", ")}
                </p>
                <p>
                  <strong>BPOM Number:</strong> {product.nomorEdar}
                </p>
              </div>
            </TabsContent>
            <TabsContent value="side-effects">
              <h3 className="font-semibold text-foreground mb-2">
                Side Effects
              </h3>
              <p>{product.sideEffects}</p>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
