export interface PaginationMeta {
  hasNext?: boolean;
  hasPrevious?: boolean;
  page: number;
  perPage?: number;
  take: number;
  total: number;
  totalPages?: number;
}

export interface PageableResponse<T> {
  data: T[];
  meta: PaginationMeta;
  message?: string;
  countVerified?: number;
  countGoogle?: number;
  countCredential?: number;
  countAdmin?: number;
  countUser?:number
}

export interface PaginationQueries {
  page?: number;
  take?: number;
  sortOrder?: string;
  sortBy?: string;
}
