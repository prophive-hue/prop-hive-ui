import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { UserRole } from '../../models';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isLoggedIn()) {
    if (authService.hasRole(UserRole.ADMIN)) {
      return router.createUrlTree(['/admin']);
    } else if (authService.hasRole(UserRole.INVESTOR)) {
      return router.createUrlTree(['/investor']);
    }
    return router.createUrlTree(['/']);
  }
  
  return true;
};