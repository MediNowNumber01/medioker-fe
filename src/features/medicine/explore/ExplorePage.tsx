"use client";

import { Acquisition, Golongan } from "@/types/semuaNgerapiinyaNtar";
import useGetProducts from "@/hooks/api/Products/useGetProducts";
import {
  parseAsInteger,
  useQueryState,
  parseAsString,
  parseAsStringEnum,
  parseAsArrayOf,
} from "nuqs";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import ItemCard from "../../../components/ItemCard";
import PaginationComponent from "../../../components/PaginationComponent";
import SearchBar from "../../../components/SearchBar";
import MobileFilter from "./components/mobileFilter/MobileFilter";
import PharmacySelector from "./components/pharmacySelector/PharmacySelector";
import SideFilter from "./components/sideFilter/SideFilter";
import { LocationRequester } from "@/features/homepage/components/LocationRequester";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, Package, AlertCircle } from "lucide-react";
import useGetPharmacies from "@/hooks/api/Pharmacy/useGetPharmacies";
import { haversineDistance } from "@/lib/haversineDistance";

type SelectionReason = "nearest" | "main" | null;

const ExplorePage = () => {
  const [selectionReason, setSelectionReason] = useState<SelectionReason>(null);
  const [isLocationProcessing, setIsLocationProcessing] = useState(true);
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );
  const [debouncedSearch] = useDebounce(search, 500);
  const [acquisition, setAcquisition] = useQueryState(
    "acquisition",
    parseAsStringEnum<Acquisition>(Object.values(Acquisition)).withDefault(
      "" as Acquisition
    )
  );
  const [golongan, setGolongan] = useQueryState(
    "golongan",
    parseAsStringEnum<Golongan>(Object.values(Golongan)).withDefault(
      "" as Golongan
    )
  );
  const [sortBy, setSortBy] = useQueryState(
    "sort",
    parseAsString.withDefault("name")
  );
  const [sortOrder, setSortOrder] = useQueryState(
    "order",
    parseAsString.withDefault("asc")
  );
  const [categories, setCategories] = useQueryState(
    "categories",
    parseAsArrayOf(parseAsString, ",").withDefault([])
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [selectedPharmacyId, setSelectedPharmacyId] = useQueryState(
    "pharmacy",
    parseAsString.withDefault("")
  );

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLocationFetched, setIsLocationFetched] = useState(false);
  const { data: allPharmacies, isLoading: isLoadingPharmacies } =
    useGetPharmacies({
      take: 500,
    });
  const {
    data: getProductsResponse,
    isLoading,
    isError,
  } = useGetProducts(
    {
      categoryId: categories.length > 0 ? categories : undefined,
      search: debouncedSearch || undefined,
      acquisition: acquisition || undefined,
      golongan: golongan || undefined,
      take: 12,
      page,
      sortBy: sortBy || "name",
      sortOrder:
        sortOrder === "asc" || sortOrder === "desc" ? sortOrder : "asc",
      pharmacyId: selectedPharmacyId || undefined,
    },
    { enabled: !!selectedPharmacyId }
  );

  const products = getProductsResponse?.data;
  const pharmacy = getProductsResponse?.pharmacy;
  const meta = getProductsResponse?.meta;

  useEffect(() => {
    const setMainPharmacy = () => {
      if (allPharmacies) {
        const mainPharmacy = allPharmacies.data.find((p) => p.isMain === true);
        if (mainPharmacy) {
          setSelectedPharmacyId(mainPharmacy.id);
          setSelectionReason("main");
        }
        setIsLocationProcessing(false);
      }
    };

    if (isLoadingPharmacies || selectedPharmacyId) {
      setIsLocationProcessing(false);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);

          if (allPharmacies) {
            const sorted = [...allPharmacies.data]
              .map((p) => ({
                ...p,
                distance: haversineDistance(
                  location.lat,
                  location.lng,
                  parseFloat(p.lat),
                  parseFloat(p.lng)
                ),
              }))
              .sort((a, b) => a.distance - b.distance);

            if (sorted.length > 0) {
              setSelectedPharmacyId(sorted[0].id);
              setSelectionReason(null);
            }
            setIsLocationProcessing(false);
          }
        },

        () => {
          setMainPharmacy();
        }
      );
    } else {
      setMainPharmacy();
    }
  }, [
    allPharmacies,
    isLoadingPharmacies,
    selectedPharmacyId,
    setSelectedPharmacyId,
  ]);

  const handleCategoryChange = (checked: string[]) => {
    setCategories(checked);
    setPage(1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [
    acquisition,
    golongan,
    debouncedSearch,
    sortBy,
    sortOrder,
    selectedPharmacyId,
  ]);

  const activeFiltersCount = [
    acquisition,
    golongan,
    categories.length > 0 ? "categories" : null,
    debouncedSearch,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <LocationRequester />

      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Explore Your Needs
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Discover the latest trends, products, and services tailored to
              your interests. Find what suits you best from our comprehensive
              collection.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6 md:px-6">
        <div className="md:hidden mb-6">
          <PharmacySelector
            pharmacy={pharmacy ?? null}
            setPharmacy={setSelectedPharmacyId}
            userLocation={userLocation}
            selectionReason={selectionReason}
          />
        </div>

        <Card className="mb-6 shadow-sm border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <SearchBar
                    className="pl-10"
                    search={search}
                    setSearch={setSearch}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                  />
                </div>
              </div>

              <div className="lg:hidden">
                <MobileFilter
                  onAcquisitionChange={(val) =>
                    setAcquisition(val as Acquisition)
                  }
                  onGolonganChange={(val) => setGolongan(val as Golongan)}
                  onCategoryChange={handleCategoryChange}
                  selectedAquisition={acquisition}
                  selectedGolongan={golongan}
                  selectedCategories={categories}
                  setSortBy={setSortBy}
                  setSortOrder={setSortOrder}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                />
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Active filters:
                </span>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""}{" "}
                  applied
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="sticky top-10">
              <SideFilter
                selectedAquisition={acquisition}
                selectedGolongan={golongan}
                selectedCategories={categories}
                onAcquisitionChange={(val) =>
                  setAcquisition(val as Acquisition)
                }
                userLocation={userLocation}
                selectionReason={selectionReason}
                onGolonganChange={(val) => setGolongan(val as Golongan)}
                onCategoryChange={handleCategoryChange}
                onPharmacyChange={setSelectedPharmacyId}
                sleectedPharmacy={pharmacy ?? null}
              />
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  {isLoading
                    ? "Loading..."
                    : `${meta?.total || 0} Products Found`}
                </h2>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <Skeleton className="w-full h-48" />
                      <div className="p-4 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-6 w-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : isError ? (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-8 text-center">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-red-900 mb-2">
                    Failed to Load Products
                  </h3>
                  <p className="text-red-700 mb-4">
                    We encountered an error while loading the products. Please
                    try again.
                  </p>
                </CardContent>
              </Card>
            ) : !products || products.length === 0 ? (
              <Card className="border-gray-200 bg-gray-50">
                <CardContent className="p-12 text-center">
                  <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Products Found
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    We couldn't find any products matching your search criteria.
                    Try adjusting your filters or search terms.
                  </p>
                  {activeFiltersCount > 0 && (
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSearch("");
                        setAcquisition("" as Acquisition);
                        setGolongan("" as Golongan);
                        setCategories([]);
                      }}
                    >
                      Clear all filters
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                  {products.map((product) => (
                    <ItemCard
                      key={product.id}
                      product={product}
                      className="w-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                      navigate={`medicines/${product.slug}`}
                    />
                  ))}
                </div>

                <div className="flex justify-center">
                  <PaginationComponent
                    paginationMeta={meta}
                    isLoading={isLoading}
                    onPageChange={(p) => setPage(p)}
                  />
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
