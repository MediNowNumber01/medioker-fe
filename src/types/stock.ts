import { Pharmacy } from "./pharmacy"; // Assuming 'Pharmacy' type is in './pharmacy'

export interface Stock {
  id: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  productId: string;
  pharmacyId: string;
  pharmacy: Pharmacy;
}