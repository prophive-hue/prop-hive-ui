import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isLoggedIn()) {
    const user = authService.getCurrentUser();
    if (user?.role === 'admin' || user?.role === 'ADMIN') {
      return router.createUrlTree(['/admin']);
    } else if (user?.role === 'investor' || user?.role === 'INVESTOR') {
      return router.createUrlTree(['/investor']);
    }
    return router.createUrlTree(['/']);
  }
  
  return true;
};