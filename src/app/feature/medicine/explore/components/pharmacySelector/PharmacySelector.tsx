"use client";

import { Pharmacy } from "@/app/types/semuaNgerapiinyaNtar";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { FC, useState } from "react";
import PharmacyCard from "./PharmacyCard";
import useGetPharmacies from "@/hooks/api/Pharmacy/useGetPharmacies";
import PaginationComponent from "@/components/PaginationComponent";
import { useDebounce } from "use-debounce";

interface PharmacySelectorProps {
  className?: string;
  pharmacy: Pharmacy | null;
  setPharmacy: (value: string) => void;
}

const PharmacySelector: FC<PharmacySelectorProps> = ({
  className,
  pharmacy,
  setPharmacy,
}) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState<number>(1);
  const { data: pharmacies, isLoading } = useGetPharmacies({
    take: 5,
    search: debouncedSearch,
    sortBy: "name",
    sortOrder,
    page,
  });
  return (
    <div className={className}>
      <Card className="px-4 py-2 mb-4 gap-2  ">
        <CardTitle className=" flex items-center gap-2 text-[1.25rem] font-semibold">
          <MapPin className="h-5 w-5" />
          Select Pharmacy
        </CardTitle>

        <Dialog>
          <form>
            <DialogTrigger asChild>
              <PharmacyCard
                className="w-full"
                pharmacy={pharmacy}
                onClick={() => {}}
              />
            </DialogTrigger>
            <DialogContent className="flex flex-col max-h-[90vh] overflow-y-auto gap-2">
              <DialogHeader>
                <DialogTitle>Change Pharmacy</DialogTitle>
                <DialogDescription>
                  Select a pharmacy to view its details.
                </DialogDescription>
                <div className={`${!pharmacy ? "hidden" : ""}`}>
                  <Label className="mb-2" htmlFor="selected Pharmacy">
                    Selected Pharmacy
                  </Label>
                  {pharmacy ? (
                    <PharmacyCard
                      className="w-full hover:cursor-default"
                      pharmacy={pharmacy}
                      onClick={() => {}}
                    />
                  ) : null}
                </div>
              </DialogHeader>
              <div className="grid gap-4 my-2">
                <Label htmlFor="search Pharmacy">Search Pharmacy</Label>
                <SearchBar
                  search={search}
                  setSearch={setSearch}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  sortBy="name"
                />
              </div>
              <div className=" w-full max-h-[400px]">
                <div className="text-muted-foreground">
                  total: {pharmacies?.meta.total} pharmacies
                </div>
                <div className="grid gap-2 max-h-[300px] overflow-y-auto px-2">
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    pharmacies?.data.map((pharmacy) => (
                      <DialogClose key={pharmacy.id} className="w-full">
                        <PharmacyCard
                          fixedLayout={true}
                          pharmacy={pharmacy}
                          onClick={() => {
                            setPharmacy(pharmacy.id);
                          }}
                        />
                      </DialogClose>
                    ))
                  )}
                  <PaginationComponent
                    paginationMeta={pharmacies?.meta}
                    isLoading={isLoading}
                    onPageChange={setPage}
                    numberNarest={0}
                  />
                </div>
              </div>
              <DialogFooter>
                <div className="flex w-full justify-between">
                  <DialogClose asChild>
                    <Button variant="secondary">Cancel</Button>
                  </DialogClose>
                </div>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>

        {/* display */}
      </Card>
    </div>
  );
};

export default PharmacySelector;
