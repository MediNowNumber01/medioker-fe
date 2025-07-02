"use client";

import { Pharmacy } from "@/types/semuaNgerapiinyaNtar";
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
import { FC, useEffect, useState } from "react";
import PharmacyCard from "./PharmacyCard";
import useGetPharmacies from "@/hooks/api/Pharmacy/useGetPharmacies";
import PaginationComponent from "@/components/PaginationComponent";
import { useDebounce } from "use-debounce";
import { haversineDistance } from "@/lib/haversineDistance";

type SelectionReason = "nearest" | "main" | null;

interface PharmacySelectorProps {
  className?: string;
  pharmacy: Pharmacy | null;
  setPharmacy: (value: string) => void;
  userLocation: { lat: number; lng: number } | null;
  selectionReason: SelectionReason;
}

type PharmacyWithDistance = Pharmacy & { distance?: number };

const PharmacySelector: FC<PharmacySelectorProps> = ({
  className,
  pharmacy,
  setPharmacy,
  userLocation,
  selectionReason,
}) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState<number>(1);
  const { data: pharmacies, isLoading } = useGetPharmacies({
    take: 500,
    search: debouncedSearch,
    sortBy: "name",
    sortOrder,
    page,
  });

  const [sortedPharmacies, setSortedPharmacies] = useState<
    PharmacyWithDistance[]
  >([]);
  const [selectedPharmacyDistance, setSelectedPharmacyDistance] = useState<
    number | undefined
  >();

  const nearestPharmacyId =
    userLocation && sortedPharmacies.length > 0 ? sortedPharmacies[0].id : null;

  useEffect(() => {
    if (pharmacies) {
      let processedPharmacies: PharmacyWithDistance[] = [...pharmacies.data];

      if (debouncedSearch) {
        processedPharmacies = processedPharmacies.filter((p) =>
          p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
      }

      if (userLocation) {
        processedPharmacies = processedPharmacies
          .map((p) => ({
            ...p,
            distance: haversineDistance(
              userLocation.lat,
              userLocation.lng,
              parseFloat(p.lat),
              parseFloat(p.lng)
            ),
          }))
          .sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
      } else {
        processedPharmacies.sort((a, b) => a.name.localeCompare(b.name));
      }

      setSortedPharmacies(processedPharmacies);
      if (pharmacy) {
        const currentSelected = processedPharmacies.find(
          (p) => p.id === pharmacy.id
        );
        setSelectedPharmacyDistance(currentSelected?.distance);
      }
    }
  }, [pharmacies, userLocation, debouncedSearch, pharmacy]);
  return (
    <div className={className}>
      <Card className="px-4 py-2 mb-4 gap-2 pb-6 ">
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
                distance={selectedPharmacyDistance}
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
                      distance={selectedPharmacyDistance}
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
                <div className="grid gap-2 max-h-[300px] overflow-y-auto px-2">
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    sortedPharmacies.map((p) => (
                      <DialogClose key={p.id} className="w-full">
                        <PharmacyCard
                          pharmacy={p}
                          onClick={() => {
                            setPharmacy(p.id);
                          }}
                          distance={p.distance}
                          isSelected={pharmacy?.id === p.id}
                          isNearest={p.id === nearestPharmacyId}
                          isMain={p.isMain}
                        />
                      </DialogClose>
                    ))
                  )}
                  {/* <PaginationComponent
                    paginationMeta={pharmacies?.meta}
                    isLoading={isLoading}
                    onPageChange={setPage}
                    numberNarest={0}
                  /> */}
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
      </Card>
    </div>
  );
};

export default PharmacySelector;
