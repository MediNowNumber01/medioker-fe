import { Cart } from "./cart";
import { Product } from "./product";

export interface UnitProduct {
  id: string;
  name: string;
  isMain: boolean;
  weight: number;
  price: number;
  ratioToMain: number;
  createdAt: Date;
  updatedAt: Date;
  Product: Product;
  productId: string;
  Cart: Cart[];
}