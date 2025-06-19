// import { Product } from "./product"; // Assuming 'Product' type is in './product'
import { Pharmacy } from "./pharmacy"; // Assuming 'Pharmacy' type is in './pharmacy'
// import { StockHistory } from "./stockHistory"; // Assuming 'StockHistory' type is in './stockHistory'
// import { Cart } from "./cart"; // Assuming 'Cart' type is in './cart'
// import { OrderStock } from "./orderStock"; // Assuming 'OrderStock' type is in './orderStock'

export interface Stock {
  id: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  productId: string;
//   product: Product;
  pharmacyId: string;
  pharmacy: Pharmacy;
//   StockHistory: StockHistory[];
//   Cart: Cart[];
//   OrderStock: OrderStock[];
}