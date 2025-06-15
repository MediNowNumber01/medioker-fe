import { PaginationQueries } from "./PaginationQueries";

export interface CategoryQueries extends PaginationQueries {
  search?: string;
}
