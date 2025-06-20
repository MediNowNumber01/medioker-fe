// types.ts

import { Admin } from "./admin";
import { Order } from "./order";
import { Stock } from "./stock";


export type Pharmacy = {
  id: string;
  name: string;
  description: string;
  slug: string;
  picture: string;
  isOpen: boolean;
  createdAt: Date;
  detailLocation: string;
  lat: string;
  lng: string;
  updatedAt: Date;
  deletedAt: Date | null;
  isMain: boolean;

  // Relations
  Admin?: Admin[];
  Order?: Order[];
  Stock?: Stock[];
};

export const MOCK_PHARMACIES: Pharmacy[] = [
  { id: 'ph1', name: 'Apotek MediNow Gejayan', detailLocation: 'Jl. Affandi No. 1, Caturtunggal', lat: '-7.7797', lng: '110.3948', description: '', slug: '', picture: '', isOpen: true, createdAt: new Date(), updatedAt: new Date(), deletedAt: null, isMain: true },
  { id: 'ph2', name: 'Apotek Sehat Sentosa', detailLocation: 'Jl. Kaliurang KM 5, Sleman', lat: '-7.7594', lng: '110.3875', description: '', slug: '', picture: '', isOpen: true, createdAt: new Date(), updatedAt: new Date(), deletedAt: null, isMain: false },
  { id: 'ph3', name: 'Apotek Waras Wiris', detailLocation: 'Jl. Godean KM 8, Bantul', lat: '-7.7828', lng: '110.3088', description: '', slug: '', picture: '', isOpen: true, createdAt: new Date(), updatedAt: new Date(), deletedAt: null, isMain: false },
  { id: 'ph4', name: 'Apotek Sumber Urip (Jauh)', detailLocation: 'Jl. Wonosari KM 15, Gunungkidul', lat: '-7.8385', lng: '110.4913', description: '', slug: '', picture: '', isOpen: true, createdAt: new Date(), updatedAt: new Date(), deletedAt: null, isMain: false },
];