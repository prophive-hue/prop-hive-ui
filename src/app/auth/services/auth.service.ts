import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ErrorHandlerService } from '../shared/service/error-handler.service';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user?: {
    id: string;
    email: string;
    fullName: string;
    [key: string]: any;
  };
  message?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private errorHandler = inject(ErrorHandlerService);
  private baseUrl = environment.apiUrl;

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  constructor() { }

  // Login method
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/session/login`, credentials)
      .pipe(
        tap(response => this.storeAuthData(response)),
        catchError(error => this.errorHandler.throwError(this.errorHandler.handleHttpError(error)))
      );
  }

  // Register method
  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/user/register`, userData)
      .pipe(
        catchError(error => this.errorHandler.throwError(this.errorHandler.handleHttpError(error)))
      );
  }

  // Logout method
  logout(): Observable<boolean> {
    // Optional: send logout request to server if your API has a logout endpoint
    // return this.http.post<any>(`${this.baseUrl}/auth/logout`, {}).pipe(
    //   tap(() => this.clearAuthData()),
    //   map(() => true),
    //   catchError(error => {
    //     this.clearAuthData();
    //     return of(true);
    //   })
    // );

    // Simple client-side logout
    this.clearAuthData();
    return of(true);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Get the current user's token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Get the current user data
  getCurrentUser(): any {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;

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
