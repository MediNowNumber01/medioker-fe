// types.ts

import { Admin } from "./admin";
import { Order } from "./order";
import { Stock } from "./stock";


export interface Pharmacy {
  id: string;
  name: string;
  picture: string;
  isOpen: boolean;
  createdAt: Date;
  detailLocation: string;
  lat: string;
  lng: string;
  updatedAt: Date;
  deletedAt?: Date | null;
  isMain: boolean;
  Admin?: Admin[];
  Order?: Order[];
  Stock?: Stock[];
  _count?: {
    Admin: number;
  };
}

