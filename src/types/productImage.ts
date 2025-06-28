import { Product } from "./semuaNgerapiinyaNtar";

export interface ProductImage {
  id: string;
  imageUrl: string;
  isThumbnail: boolean;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
  product: Product;
}