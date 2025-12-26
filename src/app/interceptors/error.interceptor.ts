import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { ErrorHandlerService } from '../shared/service/error-handler.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorHandler = inject(ErrorHandlerService);
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const appError = errorHandler.handleHttpError(error);
      
      // Handle specific error codes
      if (appError.code === 'UNAUTHORIZED') {
        authService.logout();
        router.navigate(['/auth/login']);
      }
      
      return errorHandler.throwError(appError);
    })
  );
};