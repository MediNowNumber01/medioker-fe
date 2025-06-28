import { ProductCategory } from "./productCategory";

export interface Category {
  id: string;
  name: string;
  description: string;
  updatedAt: Date;
  createdAt: Date;
  ProductCategory?: ProductCategory[];
  _count?: {
    ProductCategory: number;
  };
}
