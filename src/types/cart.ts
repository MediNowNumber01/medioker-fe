import { User } from "./user"; 

export interface Cart {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
  userId: string;
  user: User;

}