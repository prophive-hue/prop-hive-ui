import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base/base-http.service';
import { LoginRequest, RegisterRequest, AuthResponse } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AuthRepository extends BaseHttpService {

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.post<AuthResponse>('/session/login', credentials);
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.post<AuthResponse>('/user/register', userData);
  }
}