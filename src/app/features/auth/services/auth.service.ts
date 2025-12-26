import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { AuthRepository } from '../../core/api/repositories/auth.repository';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { LoginRequest, RegisterRequest, AuthResponse, User, UserRole } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authRepository = inject(AuthRepository);
  private errorHandler = inject(ErrorHandlerService);

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.authRepository.login(credentials)
      .pipe(
        tap(response => this.storeAuthData(response))
      );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.authRepository.register(userData);
  }

  logout(): Observable<boolean> {
    this.clearAuthData();
    return of(true);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  hasRole(role: UserRole): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  private storeAuthData(response: AuthResponse): void {
    if (response.accessToken) {
      localStorage.setItem(this.TOKEN_KEY, response.accessToken);
    }
    if (response.user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    }
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}
