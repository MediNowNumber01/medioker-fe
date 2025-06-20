import { Order } from "./order"; // Assuming 'Order' type is in './order'

export interface Prescription {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  source: string;
  orderId: string;
  order: Order;
}