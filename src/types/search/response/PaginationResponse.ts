export interface PaginationMeta {
  hasNext?: boolean;
  hasPrevious?: boolean;
  page: number;
  perPage?: number;
  take: number
  total: number;
  totalPages?: number;
}

export interface PageableResponse<T> {
  data: T[];
  meta: PaginationMeta;
  message?: string;
}

export interface PaginationQueries {
  page?: number;
  take?: number;
  sortOrder?: string;
  sortBy?: string;
}
