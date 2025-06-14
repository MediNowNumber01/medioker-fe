export interface PaginationMeta {
  hasNext: boolean;
  hasPrevious: boolean;
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface PageableResponse<T> {
  data: T[];
  meta: PaginationMeta;
  message?: string;
}
