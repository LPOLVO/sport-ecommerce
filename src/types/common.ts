export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface FilterOptions {
  search: string;
  priceRange: [number, number];
  categories: string[];
  brands: string[];
  sizes: string[];
  sortBy: 'featured' | 'price-low' | 'price-high' | 'newest' | 'rating';
}

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest' | 'rating';
