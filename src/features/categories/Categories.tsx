"use client";

import { useState } from "react";
import CategoriesList from "./components/CategoriesList";
import useGetCategories from "@/hooks/api/Category/useGetCategories";
import { useDebounce } from "use-debounce";
import CreateCategory from "./components/CreateCategory/CreateCategory";
import { parseAsInteger, useQueryState } from "nuqs";

const Categories = () => {
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

  const { data: categories, isLoading } = useGetCategories({
    search: debouncedSearch ? debouncedSearch : undefined,
    page,
    sortBy,
    sortOrder,
  });

  return (
    <section className="container mx-auto flex flex-col gap-4 p-4 md:p-6">
      <div>
        <h1 className="text-primary">Categories</h1>
        <p className="text-muted-foreground">
          Manage your categories effectively
        </p>
      </div>
      <CreateCategory />
      <CategoriesList
        search={search}
        setSearch={setSearch}
        paginationMeta={categories?.meta}
        onPageChange={setPage}
        categories={categories?.data}
        setSortBy={setSortBy}
        sortBy={sortBy}
        setSortOrder={setSortOrder}
        sortOrder={sortOrder}
        isLoading={isLoading}
      />
    </section>
  );
};

export default Categories;
