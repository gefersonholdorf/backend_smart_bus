export interface PaginationParams {
    page: number;
    limit: number;
    orderBy: string;
    sortDirection: 'asc' | 'desc';
  }