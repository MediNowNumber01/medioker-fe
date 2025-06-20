import { User } from "./user"; // Assuming 'User' type is in './user'

export interface Cart {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
  userId: string;
  user: User;
//   stockId: string;
//   stock: Stock;
//   unitId: string;
//   unit: UnitProduct;
}