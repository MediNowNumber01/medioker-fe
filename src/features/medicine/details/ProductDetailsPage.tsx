import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  AlertTriangle,
  Minus,
  Package,
  Plus,
  Shield,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import DisplayImage from "./components/DisplayImage";
import StockSelector from "./components/StockSelector";
import { FC } from "react";
import DisplayInfo from "./components/DisplayInfo";

interface ProductDetailsPageProps {
  // Define any props if needed
  slug: string;
}
const ProductDetailsPage: FC<ProductDetailsPageProps> = ({ slug }) => {
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

  // const incrementQuantity = () => {
  //   if (quantity < product.stock) {
  //     setQuantity(quantity + 1);
  //   }
  // };

  // const decrementQuantity = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  return (
    <div className="min-h-screen">
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

              <DisplayImage />
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
                {/* <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit Type
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
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
                      <div className="flex items-center border rounded-lg bg-muted">
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

                  <Button size="lg">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Tambah ke Keranjang
                  </Button>
                </div> */}

                {/* Important Notice */}
                <div className="bg-warning-background border border-warning rounded-lg p-4 flex items-start gap-3">
                  <AlertTriangle className="h-20 w-20 text-danger " />
                  <div className="text-sm">
                    <p className="font-medium text-danger mb-1">
                      Perhatian Khusus
                    </p>
                    <p className="text-danger">
                      Obat ini harus digunakan sesuai petunjuk dokter atau
                      apoteker. Konsultasikan dengan tenaga kesehatan jika
                      gejala tidak membaik.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pharmacy Selection */}
          <div className="space-y-6">
            <StockSelector />
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

        <DisplayInfo slug={slug} />
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
};

export default ProductDetailsPage;
