import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { UserRole } from '../../models';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/auth/login'], { 
      queryParams: { returnUrl: state.url }
    });
  }

  if (authService.hasRole(UserRole.ADMIN)) {
    return true;
  }
  
  return router.createUrlTree(['/']);
};