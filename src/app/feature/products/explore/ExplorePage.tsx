"use client";
import useGetProducts from "@/app/hooks/api/Products/useGetProducts";
import { CatCreate, Golongan } from "@/app/types/semuaNgerapiinyaNtar";
import { formatPrice } from "@/app/utils/formatPrice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDownNarrowWide,
  CircleX,
  EditIcon,
  Filter,
  MapPin,
  Package,
  Search,
  Store,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ExplorePage = () => {
  // filter
  const [filters, setFilters] = useState({
    catCreate: String,
    golongan: String,
    otherCategory: String,
  });
  const [search, setSearch] = useState<string>("");

  const [catCreate, setCatCreate] = useState<CatCreate | undefined>();
  const [golongan, setGolongan] = useState<Golongan | undefined>();
  const [otherCategory, setOtherCategory] = useState<string[]>([]);

  const { data: products, isLoading } = useGetProducts({
    search,
    catCreate,
    golongan,
  });

  if (products) {
    console.log("Products:", products);
  }
  const handleCatCreateChange = (value?: CatCreate) => {
    if (value) {
      setCatCreate(value);
    } else {
      setCatCreate(undefined);
    }
  };
  const handleGolonganChange = (value?: Golongan) => {
    if (value) {
      setGolongan(value);
    } else {
      setGolongan(undefined);
    }
  };

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

  return (
    <main className="min-h-screen bg-[#fafafc]">
      <section className="container mx-auto px-4 py-8">
        <h1>Explore Your Needs</h1>
        <p className="text-gray-600 ">
          Explore the latest trends, products, and services tailored to your
          interests. Discover new possibilities and find what suits you best.
        </p>
      </section>
      <section className="container mx-auto h-fit  mb-4">
        <Card className="px-4 py-2 mb-4 gap-2  md:hidden">
          <CardTitle className=" flex items-center gap-2 text-[1.25rem] font-semibold">
            <MapPin className="h-5 w-5" />
            Select Pharmacy
          </CardTitle>
          <Card className="p-2 gap-2 relative ">
            <div className="flex flex-row md:flex-col lg:flex-row items-center gap-2">
              <Avatar className="h-14 w-14">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="md:w-full font-medium">
                Nama Pharmacy yang dipilih
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
              debitis recusandae totam laborum mollitia repellat voluptatem iste
              officia ab maiores!
            </div>

            <EditIcon className="h-5 w-5 absolute top-2 right-2" />
          </Card>
        </Card>
        <div className="px-4 md:pl-[25%] flex items-center gap-2 ">
          <div className="relative grow w-full md:w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 text-lg bg-card"
            />
            {search && (
              <CircleX
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 color-destructive cursor-pointer"
                onClick={() => setSearch("")}
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <Select>
              <SelectTrigger className="md:w-[120px] bg-card">
                <SelectValue placeholder="sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="name">A-Z</SelectItem>
                  <SelectItem value="createdAt">Newest</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button className="bg-card aspect-square">
              <ArrowDownNarrowWide className="h-5 w-5  cursor-pointer text-card-foreground hover:text-card-background" />
            </Button>
          </div>
        </div>
      </section>

      {/* <filter /> */}

      <section className="container mx-auto  flex relative flex-col md:flex-row gap-4 p-2">
        <div className="w-full md:max-w-1/4">
          <Card className="px-4 gap-4">
            <CardHeader className="p-0 hidden md:block">
              <CardTitle className=" flex items-center gap-2 text-[1.25rem] font-semibold">
                <MapPin className="h-5 w-5" />
                Select Pharmacy
              </CardTitle>
              <Card className="p-2 gap-2 relative ">
                <div className="flex flex-row md:flex-col lg:flex-row items-center gap-2">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="md:w-full font-medium">
                    Nama Pharmacy yang dipilih
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                  debitis recusandae totam laborum mollitia repellat voluptatem
                  iste officia ab maiores!
                </div>

                <EditIcon className="h-5 w-5 absolute top-2 right-2" />
              </Card>
            </CardHeader>
            <CardHeader className="p-0">
              <CardTitle className="flex items-center gap-2 text-[1.25rem]">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Logic to clear all filters
                }}
                className="w-full"
              >
                Clear All Filters
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Accordion type="single" collapsible defaultValue="catCreate">
                <AccordionItem value="catCreate">
                  <AccordionTrigger className="text-sm font-medium">
                    Acquisition (Jenis Akusisi)
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      {Object.values(CatCreate).map((category) => (
                        <div
                          key={category}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`catCreate-${category}`}
                            checked={catCreate === category}
                            onCheckedChange={(checked) =>
                              handleCatCreateChange(
                                checked ? category : undefined
                              )
                            }
                          />
                          <Label
                            htmlFor={`catCreate-${category}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {category
                              .split("_")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() +
                                  word.slice(1).toLowerCase()
                              )
                              .join("")}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion type="single" collapsible defaultValue="golongan">
                <AccordionItem value="golongan">
                  <AccordionTrigger className="text-sm font-medium">
                    Group Category (Golongan)
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      {Object.values(Golongan).map((group) => (
                        <div
                          key={group}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`golongan-${group}`}
                            checked={golongan === group}
                            onCheckedChange={(checked) =>
                              handleGolonganChange(checked ? group : undefined)
                            }
                          />
                          <Label
                            htmlFor={`golongan-${group}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {group
                              .split("_")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() +
                                  word.slice(1).toLowerCase()
                              )
                              .join(" ")}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion type="single" collapsible defaultValue="otherCategory">
                <AccordionItem value="otherCategory">
                  <AccordionTrigger className="text-sm font-medium">
                    Other Category (Kategori Lainnya)
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 ">
                      {["Generik", "Paten", "Traditional"].map((category) => (
                        <div
                          key={category}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`catCreate-${category}`}
                            checked={false}
                            onCheckedChange={() => {}}
                          />
                          <Label
                            htmlFor={`catCreate-${category}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {category}
                          </Label>
                        </div>
                      ))}
                      <div
                        className="text-sm font-normal text-blue-500 pl-6
                       hover:underline cursor-pointer"
                      >
                        All categories
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-4/5">
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-2">
              {/* Product Cards */}
              {Array.from({ length: 30 }, (_, index) => (
                <Card
                  key={index}
                  className="p-0 relative gap-0 h-full overflow-hidden"
                >
                  <div className="relative w-full aspect-square">
                    <Image
                      src={`https://picsum.photos/200/200?random=${index}`}
                      alt={` ${index + 1}`}
                      fill
                      objectFit="contain"
                    />
                  </div>

                  <CardHeader className="p-2 pb-0">
                    <CardTitle className="text-lg font-semibold ">
                      <div className="line-clamp-3 md:line-clamp-2">
                        Paracetamol {100 * index + 1}mg
                      </div>
                      <div className="font-medium text-indigo-600 text-sm">
                        Generik
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 pt-0">
                    <div className=" space-x-2 space-y-2 flex flex-wrap w-full">
                      {["Analgesik & Antipiretik"].map((kategori, i) => {
                        const colors = ["text-foreground bg-blue-500/20 "];
                        return (
                          <Badge
                            key={kategori}
                            className={`text-xs h-fit  ${
                              colors[i % colors.length]
                            }`}
                          >
                            {kategori}
                          </Badge>
                        );
                      })}
                    </div>
                  </CardContent>
                  <CardFooter className="p-2 m-0 flex flex-col items-start gap-2">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        getStockStatus(index % 30).bgColor
                      } ${getStockStatus(index % 30).color}`}
                    >
                      <Package className="h-3 w-3 inline mr-1" />
                      {getStockStatus(index % 30).text} ({index % 30})
                    </div>
                    <div className="text-lg font-semibold">
                      <span>
                        {formatPrice(100 * index + 1)} -{" "}
                        {formatPrice(10000 + index * 1000)}
                      </span>
                    </div>
                  </CardFooter>
                  <div className="rounded-full bg-red-400 p-0 absolute top-1  right-1 aspect-square w-[2rem] border-2 border-black  "></div>
                </Card>
              ))}
            </div>
            <Pagination className="mt-4 mb-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ExplorePage;
