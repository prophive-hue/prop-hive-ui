import { UserRole } from '../interfaces/user.interface';
import { PropertyStatus } from '../interfaces/property.interface';
import { InvestorStatus } from '../interfaces/investor.interface';

// Union types for better type safety
export type UserRoleType = keyof typeof UserRole;
export type PropertyStatusType = keyof typeof PropertyStatus;
export type InvestorStatusType = keyof typeof InvestorStatus;

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// API response types
export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
};

export type ApiErrorResponse = {
  success: false;
  error: string;
  code?: string;
  details?: any;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Form types
export type FormErrors<T> = {
  [K in keyof T]?: string[];
};

export type FormState<T> = {
  data: T;
  errors: FormErrors<T>;
  loading: boolean;
  submitted: boolean;
};

// Pagination types
export type SortDirection = 'asc' | 'desc';
export type SortField<T> = keyof T;

export interface SortOptions<T> {
  field: SortField<T>;
  direction: SortDirection;
}

// Component state types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ComponentState<T> {
  data: T | null;
  loading: LoadingState;
  error: string | null;
}