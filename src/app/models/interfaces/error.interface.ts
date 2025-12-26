export enum ErrorType {
  NETWORK = 'NETWORK_ERROR',
  VALIDATION = 'VALIDATION_ERROR',
  AUTHENTICATION = 'UNAUTHORIZED',
  AUTHORIZATION = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER_ERROR',
  BUSINESS = 'BUSINESS_ERROR',
  UNKNOWN = 'UNKNOWN_ERROR'
}

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface AppError {
  message: string;
  type: ErrorType;
  severity: ErrorSeverity;
  code?: string;
  details?: any;
  timestamp?: Date;
  userFriendly?: boolean;
}

export interface ErrorDisplayOptions {
  showToast?: boolean;
  showModal?: boolean;
  autoHide?: boolean;
  duration?: number;
}