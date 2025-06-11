"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  MapPin,
  Clock,
  Shield,
  AlertTriangle,
  Pill,
  Info,
  Package,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProductDetailsPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedPharmacy, setSelectedPharmacy] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = {
    id: 1,
    name: "Paracetamol 500mg",
    genericName: "Acetaminophen",
    brand: "Sanbe Farma",
    category: "Analgesik & Antipiretik",
    price: 15000,
    originalPrice: 18000,
    rating: 4.5,
    reviewCount: 128,
    stock: 50,
    description:
      "Paracetamol adalah obat yang digunakan untuk meredakan nyeri ringan hingga sedang dan menurunkan demam. Obat ini bekerja dengan cara menghambat produksi prostaglandin di otak.",
    composition: "Tiap tablet mengandung Paracetamol 500 mg",
    indication:
      "Meredakan nyeri ringan hingga sedang seperti sakit kepala, sakit gigi, nyeri otot, dan menurunkan demam",
    dosage:
      "Dewasa: 1-2 tablet, 3-4 kali sehari. Anak 6-12 tahun: 1/2-1 tablet, 3-4 kali sehari",
    sideEffects:
      "Jarang terjadi efek samping jika digunakan sesuai dosis. Efek samping yang mungkin terjadi: mual, muntah, ruam kulit",
    contraindication:
      "Hipersensitif terhadap paracetamol, gangguan fungsi hati berat",
    storage:
      "Simpan pada suhu ruang (15-30°C), terlindung dari cahaya dan kelembaban",
    bpom: "DTL0332708637A1",
    manufacturer: "PT Sanbe Farma",
    packaging: "Strip @ 10 tablet",
  };

  const pharmacies = [
    {
      id: 1,
      name: "Apotek Kimia Farma",
      address: "Jl. Sudirman No. 123, Jakarta Pusat",
      distance: "1.2 km",
      rating: 4.8,
      deliveryTime: "30-45 menit",
      deliveryFee: 5000,
      stock: 25,
    },
    {
      id: 2,
      name: "Guardian Pharmacy",
      address: "Mall Central Park Lt. 1, Jakarta Barat",
      distance: "2.5 km",
      rating: 4.6,
      deliveryTime: "45-60 menit",
      deliveryFee: 8000,
      stock: 15,
    },
    {
      id: 3,
      name: "Apotek K-24",
      address: "Jl. Thamrin No. 456, Jakarta Pusat",
      distance: "3.1 km",
      rating: 4.7,
      deliveryTime: "60-75 menit",
      deliveryFee: 10000,
      stock: 30,
    },
  ];

  const relatedProducts = [
    {
      id: 2,
      name: "Ibuprofen 400mg",
      price: 12000,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Aspirin 80mg",
      price: 8000,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "Panadol Extra",
      price: 25000,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 5,
      name: "Bodrex",
      price: 18000,
      image: "/placeholder.svg?height=80&width=80",
    },
  ];

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Home</span>
            <span>/</span>
            <span>Store</span>
            <span>/</span>
            <span className="text-blue-600 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Image & Basic Info */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Product Image */}
              <div className="space-y-4">
                <div className="relative bg-white rounded-lg border p-8">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-auto object-contain"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isFavorite
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </Button>
                </div>

                {/* Thumbnail Images */}
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-16 h-16 bg-white rounded border p-2"
                    >
                      <Image
                        src="/placeholder.svg?height=60&width=60"
                        alt={`Product view ${i}`}
                        width={60}
                        height={60}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {product.category}
                  </Badge>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  <p className="text-gray-600 mb-2">
                    {product.genericName} • {product.brand}
                  </p>

                  {/* Rating */}

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl font-bold text-blue-600">
                      Rp {product.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                {/* Stock Info */}
                <div className="flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 font-medium">
                    Avalible Stok: {product.stock} unit
                  </span>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit Type
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="lg"
                        className={`${
                          selectedPharmacy === 0 ? "bg-blue-100" : ""
                        }`}
                        onClick={() => setSelectedPharmacy(0)}
                      >
                        Tablet
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className={`${
                          selectedPharmacy === 1 ? "bg-blue-100" : ""
                        }`}
                        onClick={() => setSelectedPharmacy(1)}
                      >
                        Sirup
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className={`${
                          selectedPharmacy === 2 ? "bg-blue-100" : ""
                        }`}
                        onClick={() => setSelectedPharmacy(2)}
                      >
                        Kapsul
                      </Button>
                    </div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      Jumlah
                    </Label>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={decrementQuantity}
                          disabled={quantity <= 1}
                          className="h-10 w-10"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-4 py-2 min-w-[60px] text-center">
                          {quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={incrementQuantity}
                          disabled={quantity >= product.stock}
                          className="h-10 w-10"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className="text-sm text-gray-600">
                        Max. {product.stock} unit
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <Button size="lg">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Tambah ke Keranjang
                  </Button>
                </div>

                {/* Important Notice */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-10 w-10 text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-800 mb-1">
                        Perhatian Khusus
                      </p>
                      <p className="text-yellow-700">
                        Obat ini harus digunakan sesuai petunjuk dokter atau
                        apoteker. Konsultasikan dengan tenaga kesehatan jika
                        gejala tidak membaik.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pharmacy Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Select Pharmacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  key={pharmacies[0].id}
                  className={`border flex gap-4 rounded-lg p-4 cursor-pointer `}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">
                        {pharmacies[0].name}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {pharmacies[0].address}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Badge */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Produk Original</p>
                    <p className="text-sm text-gray-600">
                      Terjamin keaslian dan kualitas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Deskripsi</TabsTrigger>
              <TabsTrigger value="composition">Komposisi</TabsTrigger>
              <TabsTrigger value="dosage">Dosis & Aturan</TabsTrigger>
              <TabsTrigger value="effects">Efek Samping</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Info Product</h3>
                      <Table>
                        <TableBody className="relative w-full">
                          <TableRow>
                            <TableCell className="font-medium text-left w-1/3 whitespace-nowrap">
                              MIMS
                            </TableCell>
                            <TableCell className="text-left">
                              {product.genericName}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-left w-1/3 whitespace-nowrap">
                              Brand
                            </TableCell>
                            <TableCell className="text-left">
                              {product.brand}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-left w-1/3 whitespace-nowrap">
                              Acquisition
                            </TableCell>
                            <TableCell className="text-left">Generik</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-left w-1/3 whitespace-nowrap">
                              Group Category (golongan)
                            </TableCell>
                            <TableCell className="text-left">
                              Obat Bebas
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell colSpan={2}>
                              <div className="font-medium">Description</div>
                              <div className="text-gray-700 whitespace-pre-wrap mt-2">
                                {product.description}
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2">
                        Category : {product.category}
                      </h4>
                      <p className=" text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ducimus hic autem velit, debitis saepe porro excepturi,
                        facilis eligendi in quisquam totam obcaecati
                        reprehenderit cupiditate voluptate fugit iusto odit
                        corrupti quos commodi eius. Doloribus adipisci sint
                        laudantium consequatur ipsum. Impedit nobis eius
                        voluptatem placeat. Dolorem unde consectetur debitis
                        pariatur cum ratione.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="composition" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Komposisi</h3>
                      <p className="text-gray-700">{product.composition}</p>
                    </div>
                    <Separator />
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">No. BPOM:</span>
                        <span className="ml-2">{product.bpom}</span>
                      </div>
                      <div>
                        <span className="font-medium">Manufaktur:</span>
                        <span className="ml-2">{product.manufacturer}</span>
                      </div>
                      <div>
                        <span className="font-medium">Kemasan:</span>
                        <span className="ml-2">{product.packaging}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dosage" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">
                        Dosis & Aturan Pakai
                      </h3>
                      <p className="text-gray-700">{product.dosage}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="effects" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div>
                    <h3 className="font-semibold mb-2">Efek Samping</h3>
                    <p className="text-gray-700">{product.sideEffects}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">Produk Terkait</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((item) => (
              <Card
                key={item.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-full h-20 object-contain mb-3"
                  />
                  <h4 className="font-medium text-sm mb-2 line-clamp-2">
                    {item.name}
                  </h4>
                  <p className="text-blue-600 font-semibold">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
