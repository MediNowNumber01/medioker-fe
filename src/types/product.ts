import { Acquisition } from "./acquisition";
import { Golongan } from "./golongan";
import { ProductCategory } from "./productCategory";
import { ProductImage } from "./productImage";
import { Stock } from "./stock";
import { UnitProduct } from "./unitProduct";

export interface Product {
  id: string;
  name: string;
  slug: string;
  published: boolean;
  nameMIMS: string;
  golongan: Golongan;
  acquisition: Acquisition;
  nomorEdar: string;
  needsPrescription: boolean;
  brand: string;
  description: string;
  composition: string;
  dose: string;
  sideEffects: string;
  indication: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  ProductImage: ProductImage[];
  UnitProduct: UnitProduct[];
  ProductCategory?: ProductCategory[];
  Stock: Stock[];
}