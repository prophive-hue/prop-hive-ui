import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { ErrorType } from '../../../models';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorHandler = inject(ErrorHandlerService);
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const appError = errorHandler.handleHttpError(error);
      
      // Handle specific error types
      switch (appError.type) {
        case ErrorType.AUTHENTICATION:
          authService.logout();
          router.navigate(['/auth/login']);
          break;
        case ErrorType.AUTHORIZATION:
          // Stay on current page but show error
          errorHandler.displayError(appError);
          break;
        default:
          // Display error for other types
          errorHandler.displayError(appError);
      }
      
      return errorHandler.throwError(appError);
    })
  );
};