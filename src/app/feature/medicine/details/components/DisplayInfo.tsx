"use client";
import { Input } from "@/components/ui/input";
import { useQueryState } from "nuqs";
import { FC } from "react";

const DisplayInfo: FC<{ slug: string }> = ({ slug }) => {
  const [searchParams, setSearchParams] = useQueryState("search", {
    defaultValue: "",
  });
  return (
    <div className="mt-12">
      <Input
        value={searchParams}
        onChange={(e) => setSearchParams(e.target.value)}
        placeholder="Search product..."
        className="w-full mb-6"
      />
      {/* <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-fit bg-secondary">
          <TabsTrigger value="description" className="whitespace-pre-wrap">
            Description
          </TabsTrigger>
          <TabsTrigger value="composition" className="whitespace-pre-wrap">
            Composition
          </TabsTrigger>
          <TabsTrigger value="dosage" className="whitespace-pre-wrap">
            Dosage & Administration
          </TabsTrigger>
          <TabsTrigger value="effects" className="whitespace-pre-wrap">
            Side Effects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3>Product Info</h3>
                  <Table>
                    <TableBody className="relative w-full">
                      <TableRow>
                        <TableCell className="font-medium text-left w-1/3 whitespace-nowrap">
                          <p>MIMS</p>
                        </TableCell>
                        <TableCell className="text-left">
                          <p>{product.genericName}</p>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-left w-1/3 whitespace-nowrap">
                          <p>Brand</p>
                        </TableCell>
                        <TableCell className="text-left">
                          <p>{product.brand}</p>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-left w-1/3 whitespace-nowrap">
                          <p>Acquisition</p>
                        </TableCell>
                        <TableCell className="text-left">
                          <p>Generik</p>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-left w-1/3 whitespace-nowrap">
                          <p>Group Category (golongan)</p>
                        </TableCell>
                        <TableCell className="text-left">
                          <p>Obat Bebas</p>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell colSpan={2}>
                          <p>Description</p>
                          <p className="whitespace-pre-wrap mt-2">
                            {product.description}
                          </p>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2">
                    Category : {product.ProductCategory}
                  </h3>
                  <p className=" text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ducimus hic autem velit, debitis saepe porro excepturi,
                    facilis eligendi in quisquam totam obcaecati reprehenderit
                    cupiditate voluptate fugit iusto odit corrupti quos commodi
                    eius. Doloribus adipisci sint laudantium consequatur ipsum.
                    Impedit nobis eius voluptatem placeat. Dolorem unde
                    consectetur debitis pariatur cum ratione.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="composition" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Komposisi</h3>
                  <p className="text-gray-700">{product.composition}</p>
                </div>
                <Separator />
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">No. BPOM:</span>
                    <span className="ml-2">{product.bpom}</span>
                  </div>
                  <div>
                    <span className="font-medium">Manufaktur:</span>
                    <span className="ml-2">{product.manufacturer}</span>
                  </div>
                  <div>
                    <span className="font-medium">Kemasan:</span>
                    <span className="ml-2">{product.packaging}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dosage" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Dosis & Aturan Pakai</h3>
                  <p className="text-gray-700">{product.dosage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="effects" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div>
                <h3 className="font-semibold mb-2">Efek Samping</h3>
                <p className="text-gray-700">{product.sideEffects}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs> */}
    </div>
  );
};

export default DisplayInfo;
