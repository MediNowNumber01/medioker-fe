"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter, Search, Store } from "lucide-react";

const ExplorePage = () => {
  return (
    <main>
      <section className="container mx-auto px-4 py-8">
        <h1>Explore Your Needs</h1>
        <p>
          Explore the latest trends, products, and services tailored to your
          interests. Discover new possibilities and find what suits you best.
        </p>
      </section>
      <section className="container mx-auto px-4">
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search medicines, brands, or symptoms..."
              value={"nyari obat"}
              onChange={(e) => {}}
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto  px-4  grid lg:grid-cols-6  md:grid-cols-5 sm:grid-cols-4 gap-4">
        <div className="md:col-span-1 col-span-4 md:min-h-screen bg-gray-100 ">
          <Card className="p-2 gap-4">
            <CardHeader className="p-0">
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Pharmacy
              </CardTitle>
              <Card>input your pharmacy</Card>
            </CardHeader>
            <CardHeader className="p-0">
              <CardTitle className="flex items-center gap-2">
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
                      {["obat keras", "obat terbatas", "obat bebas"].map(
                        (golongan) => (
                          <div
                            key={golongan}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`golongan-${golongan}`}
                              checked={false} // Replace with actual checked state
                              onCheckedChange={() => {}}
                            />
                            <Label
                              htmlFor={`golongan-${golongan}`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {golongan}
                            </Label>
                          </div>
                        )
                      )}
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
                      <p
                        className="text-sm font-normal text-blue-500 pl-6
                      "
                      >
                        all categories
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-4 lg:col-span-5 bg-amber-200">
          this is item section
        </div>
      </section>
    </main>
  );
};

export default ExplorePage;
