import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const investorGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/auth/login'], { 
      queryParams: { returnUrl: state.url }
    });
  }

  const user = authService.getCurrentUser();
  if (user?.role === 'investor' || user?.role === 'INVESTOR') {
    return true;
  }
  
  return router.createUrlTree(['/']);
};