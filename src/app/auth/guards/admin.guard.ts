import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/auth/login'], { 
      queryParams: { returnUrl: state.url }
    });
  }

  const user = authService.getCurrentUser();
  if (user?.role === 'admin' || user?.role === 'ADMIN') {
    return true;
  }
  
  return router.createUrlTree(['/']);
};