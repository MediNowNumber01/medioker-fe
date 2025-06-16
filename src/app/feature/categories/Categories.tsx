"use client";

import { useState } from "react";
import CategoriesList from "./components/CategoriesList";
import useGetCategories from "@/hooks/api/Category/useGetCategories";
import { useDebounce } from "use-debounce";
import CreateCategory from "./components/CreateCategory/CreateCategory";

const Categories = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const { data: categories, isLoading } = useGetCategories({
    search: debouncedSearch ? debouncedSearch : undefined,
    page,
    sortBy,
    sortOrder,
  });

  return (
    <section className="container mx-auto flex flex-col gap-4 p-2">
      <div>
        <h1 className="text-accent">Categories</h1>
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
