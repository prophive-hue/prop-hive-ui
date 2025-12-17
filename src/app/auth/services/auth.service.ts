import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

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
  private baseUrl = 'https://ylkgde9us8.execute-api.eu-west-1.amazonaws.com/dev';

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  constructor() { }

  // Login method
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/session/login`, credentials)
      .pipe(
        tap(response => this.storeAuthData(response)),
        catchError(this.handleError)
      );
  }

  // Register method
  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/user/register`, userData)
      .pipe(
        catchError(this.handleError)
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
      console.log('Token stored:', this.getToken())
    }
    if (response.user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    }
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);

  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error?.message ||
        `Server returned code ${error.status}, error message: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
