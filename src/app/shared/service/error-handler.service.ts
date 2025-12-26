import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export interface AppError {
  message: string;
  code?: string;
  details?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  handleHttpError(error: HttpErrorResponse): AppError {
    let appError: AppError;

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      appError = {
        message: 'Network error occurred. Please check your connection.',
        code: 'NETWORK_ERROR',
        details: error.error.message
      };
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          appError = {
            message: error.error?.message || 'Invalid request',
            code: 'BAD_REQUEST'
          };
          break;
        case 401:
          appError = {
            message: 'Authentication required',
            code: 'UNAUTHORIZED'
          };
          break;
        case 403:
          appError = {
            message: 'Access denied',
            code: 'FORBIDDEN'
          };
          break;
        case 404:
          appError = {
            message: 'Resource not found',
            code: 'NOT_FOUND'
          };
          break;
        case 500:
          appError = {
            message: 'Server error occurred. Please try again later.',
            code: 'SERVER_ERROR'
          };
          break;
        default:
          appError = {
            message: error.error?.message || 'An unexpected error occurred',
            code: 'UNKNOWN_ERROR'
          };
      }
    }

    console.error('HTTP Error:', error);
    return appError;
  }

  throwError(appError: AppError) {
    return throwError(() => appError);
  }
}