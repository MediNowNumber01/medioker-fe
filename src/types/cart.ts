import { Stock } from "./stock";
import { UnitProduct } from "./unitProduct";
import { User } from "./user";

export interface Cart {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
  userId: string;
  user: User;
  stockId: string;
  stock: Stock;
  unitId: string;
  unit: UnitProduct;
}