import { Acquisition, Golongan } from "../../semuaNgerapiinyaNtar";
import { PaginationQueries } from "./PaginationQueries";

export interface ProductQueries extends PaginationQueries {
  search?: string;
  categoryId?: string[];
  pharmacyId?: string;
  golongan?: Golongan;
  acquisition?: Acquisition;
}
