import { Cart } from "./cart";
import { OrderStock } from "./orderStock";
import { Pharmacy } from "./pharmacy";
import { Product } from "./product";
import { StockHistory } from "./semuaNgerapiinyaNtar";

export interface Stock {
  id: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  productId: string;
  product: Product;
  pharmacyId: string;
  pharmacy: Pharmacy;
  StockHistory: StockHistory[];
  Cart: Cart[];
  OrderStock: OrderStock[];
}