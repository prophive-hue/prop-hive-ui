import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { AppError, ErrorType, ErrorSeverity, ErrorDisplayOptions } from '../../models';

/**
 * Service for handling application errors with consistent user experience.
 * Provides error classification, logging, and user-friendly error display.
 * 
 * @example
 * ```typescript
 * // Handle HTTP error
 * const appError = this.errorHandler.handleHttpError(httpError);
 * 
 * // Display error to user
 * this.errorHandler.displayError(appError, { showToast: true });
 * 
 * // Throw formatted error
 * return this.errorHandler.throwError(appError);
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private messageService = inject(MessageService);

  /**
   * Convert HTTP error to standardized AppError format
   * @param error - HTTP error response
   * @returns Formatted AppError with user-friendly message
   */
  handleHttpError(error: HttpErrorResponse): AppError {
    const timestamp = new Date();
    let appError: AppError;

    if (error.error instanceof ErrorEvent) {
      appError = {
        message: 'Network connection failed. Please check your internet connection.',
        type: ErrorType.NETWORK,
        severity: ErrorSeverity.HIGH,
        code: 'NETWORK_ERROR',
        details: error.error.message,
        timestamp,
        userFriendly: true
      };
    } else {
      switch (error.status) {
        case 400:
          appError = {
            message: error.error?.message || 'Invalid request data',
            type: ErrorType.VALIDATION,
            severity: ErrorSeverity.MEDIUM,
            code: 'BAD_REQUEST',
            timestamp,
            userFriendly: true
          };
          break;
        case 401:
          appError = {
            message: 'Please log in to continue',
            type: ErrorType.AUTHENTICATION,
            severity: ErrorSeverity.HIGH,
            code: 'UNAUTHORIZED',
            timestamp,
            userFriendly: true
          };
          break;
        case 403:
          appError = {
            message: 'You do not have permission to perform this action',
            type: ErrorType.AUTHORIZATION,
            severity: ErrorSeverity.HIGH,
            code: 'FORBIDDEN',
            timestamp,
            userFriendly: true
          };
          break;
        case 404:
          appError = {
            message: 'The requested resource was not found',
            type: ErrorType.NOT_FOUND,
            severity: ErrorSeverity.MEDIUM,
            code: 'NOT_FOUND',
            timestamp,
            userFriendly: true
          };
          break;
        case 500:
          appError = {
            message: 'Server error occurred. Please try again later.',
            type: ErrorType.SERVER,
            severity: ErrorSeverity.CRITICAL,
            code: 'SERVER_ERROR',
            timestamp,
            userFriendly: true
          };
          break;
        default:
          appError = {
            message: error.error?.message || 'An unexpected error occurred',
            type: ErrorType.UNKNOWN,
            severity: ErrorSeverity.MEDIUM,
            code: 'UNKNOWN_ERROR',
            timestamp,
            userFriendly: true
          };
      }
    }

    this.logError(appError, error);
    return appError;
  }

  /**
   * Display error to user with configurable options
   * @param appError - Error to display
   * @param options - Display configuration options
   */
  displayError(appError: AppError, options: ErrorDisplayOptions = {}) {
    const defaultOptions: ErrorDisplayOptions = {
      showToast: true,
      autoHide: true,
      duration: 5000
    };
    
    const finalOptions = { ...defaultOptions, ...options };

    if (finalOptions.showToast && appError.userFriendly) {
      this.messageService.add({
        severity: this.getSeverityForToast(appError.severity),
        summary: this.getSummaryForError(appError.type),
        detail: appError.message,
        life: finalOptions.duration
      });
    }
  }

  /**
   * Map error severity to PrimeNG toast severity
   * @param severity - AppError severity level
   * @returns PrimeNG severity string
   */
  private getSeverityForToast(severity: ErrorSeverity): string {
    switch (severity) {
      case ErrorSeverity.LOW: return 'info';
      case ErrorSeverity.MEDIUM: return 'warn';
      case ErrorSeverity.HIGH: return 'error';
      case ErrorSeverity.CRITICAL: return 'error';
      default: return 'warn';
    }
  }

  /**
   * Get user-friendly summary for error type
   * @param type - Error type classification
   * @returns Human-readable error summary
   */
  private getSummaryForError(type: ErrorType): string {
    switch (type) {
      case ErrorType.NETWORK: return 'Connection Error';
      case ErrorType.VALIDATION: return 'Validation Error';
      case ErrorType.AUTHENTICATION: return 'Authentication Required';
      case ErrorType.AUTHORIZATION: return 'Access Denied';
      case ErrorType.NOT_FOUND: return 'Not Found';
      case ErrorType.SERVER: return 'Server Error';
      case ErrorType.BUSINESS: return 'Business Rule Error';
      default: return 'Error';
    }
  }

  /**
   * Log error with structured format and grouping
   * @param appError - Error to log
   * @param originalError - Original error object (optional)
   */
  private logError(appError: AppError, originalError?: any) {
    console.group(`🚨 ${appError.type} - ${appError.severity.toUpperCase()}`);
    console.error('Message:', appError.message);
    console.error('Code:', appError.code);
    console.error('Timestamp:', appError.timestamp);
    if (appError.details) console.error('Details:', appError.details);
    if (originalError) console.error('Original Error:', originalError);
    console.groupEnd();
  }

  /**
   * Throw formatted error for RxJS error handling
   * @param appError - Error to throw
   * @returns Observable error
   */
  throwError(appError: AppError) {
    return throwError(() => appError);
  }
}