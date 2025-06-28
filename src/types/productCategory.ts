import { Category } from "./category";
import { Product } from "./product";

export interface ProductCategory {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
  product?: Product;
  categoryId: string;
  category?: Category;
}