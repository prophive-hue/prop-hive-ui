export interface PaginationRequest {
  page: number;
  size: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first?: boolean;
  last?: boolean;
}

export interface ApiResponse<T = any> {
  data?: T;
  message: string;
  success: boolean;
  timestamp?: string;
}

export interface ErrorResponse {
  message: string;
  code: string;
  details?: any;
  timestamp?: string;
}