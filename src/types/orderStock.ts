import { Order } from "./order";
import { Stock } from "./stock";

export interface OrderStock {
  id: string;
  quantity_base_default: number;
  product_unit_name: string;
  quantity_unit: number;
  product_unit_weight: number;
  product_ratio: number;
  priceAtPurchase: number;
  createdAt: Date;
  updatedAt: Date;
  orderId: string;
  order: Order;
  stockId: string;
  stock: Stock;
}
