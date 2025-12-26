export interface User {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
  name?: string;
  surname?: string;
  phone?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

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
  user?: User;
  message?: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  INVESTOR = 'INVESTOR',
  DEVELOPER = 'DEVELOPER'
}