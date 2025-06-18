"use client";
import { Button } from "@/components/ui/button";
import useGetAdminPharmacies from "@/hooks/api/Pharmacy/useGetAdminPharmacies";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import PharmaciesList from "../components/PharmaciesList";
import PharmaciesOverview from "../components/PharmaciesOverview";

const PharmacyDashboard = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isOpen, setIsOpen] = useState<undefined | string>(undefined);
  const { data: pharmacies } = useGetAdminPharmacies({
    search: debouncedSearch,
    page: page,
    sortBy: sortBy,
    sortOrder: sortOrder,
    isOpen:
      isOpen === "open" ? "open" : isOpen === "closed" ? "closed" : undefined,
    take: 10,
    all: false,
  });

  useEffect(() => {
    setPage(1);
    window.scrollTo(0, 0);
  }, [debouncedSearch, sortBy, sortOrder, isOpen]);
  return (
    <>
      {/* title */}
      <section className="container mx-auto flex flex-col gap-4 p-2">
        <div>
          <h1 className="text-primary">Pharmacies</h1>
          <p className="text-muted-foreground">
            Manage your pharmacy effectively
          </p>
        </div>
        <PharmaciesOverview />
        <Link
          href="/superadmin/pharmacies/create"
          className="hover:cursor-pointer"
        >
          <Button className="w-full">Create Pharmacy</Button>
        </Link>
        <PharmaciesList
          onPageChange={setPage}
          search={search}
          setSearch={setSearch}
          paginationMeta={pharmacies?.meta} // Replace with actual pagination meta if available
          pharmacies={pharmacies?.data} // Replace with actual categories data if available
          setSortBy={setSortBy}
          sortBy={sortBy}
          setSortOrder={setSortOrder}
          sortOrder={sortOrder}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isLoading={false}
        />
      </section>
    </>
  );
};

export default PharmacyDashboard;
