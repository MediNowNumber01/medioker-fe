"use client";
import { Button } from "@/components/ui/button";
import useGetAdminPharmacies from "@/hooks/api/Pharmacy/useGetAdminPharmacies";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import PharmaciesList from "../components/PharmaciesList";
import PharmaciesOverview from "../components/PharmaciesOverview";
import { parseAsInteger, useQueryState } from "nuqs";
import { parse } from "path";

const PharmacyDashboard = () => {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
  });
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "name",
  });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "asc",
  });
  const [isOpen, setIsOpen] = useQueryState("isOpen", {
    defaultValue: "all",
  });
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
  }, [debouncedSearch, sortBy, sortOrder, isOpen]);
  return (
    <>
      <section className="container mx-auto flex flex-col gap-4 px-4 ">
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
          paginationMeta={pharmacies?.meta}
          pharmacies={pharmacies?.data}
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
