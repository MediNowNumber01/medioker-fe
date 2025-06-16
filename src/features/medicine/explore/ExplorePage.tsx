"use client";
import { Acquisition, Golongan } from "@/app/types/semuaNgerapiinyaNtar";
import useGetProducts from "@/hooks/api/Products/useGetProducts";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import ItemCard from "../../../components/ItemCard";
import PaginationComponent from "../../../components/PaginationComponent";
import SearchBar from "../../../components/SearchBar";
import MobileFilter from "./components/mobileFilter/MobileFilter";
import PharmacySelector from "./components/pharmacySelector/PharmacySelector";
import SideFilter from "./components/sideFilter/SideFilter";

const ExplorePage = () => {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
  });
  const [debouncedSearch] = useDebounce(search, 500);

  const [acquisition, setAcquisition] = useQueryState("acquisition", {
    defaultValue: "",
  });
  const [golongan, setGolongan] = useQueryState("golongan", {
    defaultValue: "",
  });
  const [sortBy, setSortBy] = useQueryState("sort", {
    defaultValue: "name",
  });

  const [sortOrder, setSortOrder] = useQueryState("order", {
    defaultValue: "asc",
  });
  const [categories, setCategories] = useQueryState("categories", {
    defaultValue: [],
    history: "replace",
    parse: (value) => (value ? value.split(",O") : []),
    serialize: (value) => value.join(","),
  });
  const [page, setPage] = useState<number>(1);
  const [selectedPharmacyId, setSelectedPharmacyId] = useQueryState(
    "pharmacy",
    {
      defaultValue: "",
    }
  );
  const { data: getproducts, isLoading } = useGetProducts({
    categoryId: categories.length > 0 ? categories : undefined,
    search: debouncedSearch,
    acquisition: Object.values(Acquisition).includes(acquisition as Acquisition)
      ? (acquisition as Acquisition)
      : undefined,
    golongan: Object.values(Golongan).includes(golongan as Golongan)
      ? (golongan as Golongan)
      : undefined,
    take: 30,
    page,
    sortBy,
    pharmacyId: selectedPharmacyId ? selectedPharmacyId : undefined,
    sortOrder:
      sortOrder === "asc" || sortOrder === "desc" ? sortOrder : undefined,
  });

  const handleCategoryChange = (checked: string[]) => {
    const detachCategory = checked.filter((cat) => categories.includes(cat));
    const attachCategory = checked.filter((cat) => !categories.includes(cat));
    const newCategories = categories.filter(
      (cat) => !detachCategory.includes(cat)
    );
    newCategories.push(...attachCategory);
    setCategories(newCategories ? newCategories : []);
  };
  useEffect(() => {
    setPage(1);
    window.scrollTo(0, 0);
  }, [acquisition, golongan, categories, debouncedSearch, sortBy]);

  return (
    <main className="min-h-screen ">
      <section className="container mx-auto px-2 py-8">
        <h1 className="text-accent">Explore Your Needs</h1>
        <p className="text-muted-foreground md:text-lg">
          Explore the latest trends, products, and services tailored to your
          interests. Discover new possibilities and find what suits you best.
        </p>
      </section>
      <section className="container mx-auto h-fit  mb-4 px-2">
        <PharmacySelector
          className=" md:hidden"
          pharmacy={getproducts?.pharmacy ? getproducts.pharmacy : null}
          setPharmacy={setSelectedPharmacyId}
        />
        <SearchBar
          className="w-full md:pl-[25%]"
          search={search}
          setSearch={setSearch}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <MobileFilter
          onAcquisitionChange={setAcquisition}
          onGolonganChange={setGolongan}
          onCategoryChange={handleCategoryChange}
          selectedAquisition={acquisition as Acquisition}
          selectedGolongan={golongan}
          selectedCategories={categories}
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
      </section>

      {/* <filter /> */}

      <section className="container mx-auto  flex relative flex-col md:flex-row gap-4 p-2">
        <SideFilter
          className="w-full md:w-1/4 hidden md:block"
          selectedAquisition={acquisition as Acquisition}
          selectedGolongan={golongan}
          selectedCategories={categories}
          onAcquisitionChange={setAcquisition}
          onGolonganChange={setGolongan}
          onCategoryChange={handleCategoryChange}
          onPharmacyChange={setSelectedPharmacyId}
          sleectedPharmacy={getproducts?.pharmacy ? getproducts.pharmacy : null}
        />
        <div className="w-full md:w-4/5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-2">
            {/* Product Cards */}
            {getproducts?.data.map((product) => {
              return (
                <ItemCard
                  key={product.id}
                  product={product}
                  className="w-full"
                  navigate={`medicines/${product.slug}`}
                />
              );
            })}
          </div>
          <PaginationComponent
            paginationMeta={getproducts?.meta}
            isLoading={isLoading}
            onPageChange={setPage}
          />
        </div>
      </section>
    </main>
  );
};

export default ExplorePage;
