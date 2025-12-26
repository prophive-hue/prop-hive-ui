import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AppConfig, FeatureFlags } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly config: AppConfig = {
    production: environment.production,
    apiUrl: environment.apiUrl,
    apiTimeout: 30000,
    enableLogging: !environment.production,
    enableAnalytics: environment.production,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    supportedFileTypes: ['.jpg', '.jpeg', '.png', '.pdf', '.doc', '.docx'],
    pagination: {
      defaultPageSize: 10,
      maxPageSize: 100
    },
    auth: {
      tokenKey: 'auth_token',
      refreshTokenKey: 'refresh_token',
      tokenExpiryBuffer: 300000 // 5 minutes
    },
    ui: {
      theme: 'light',
      language: 'en',
      dateFormat: 'dd/MM/yyyy',
      currency: 'GBP'
    }
  };

  constructor() {
    if (!environment.production) {
      console.log('🔧 ConfigService initialized with API URL:', this.config.apiUrl);
      console.log('🔧 Environment object:', environment);
    }
  }

  private readonly featureFlags: FeatureFlags = {
    enableNewDashboard: environment.features?.enableNewDashboard ?? true,
    enableAdvancedSearch: environment.features?.enableAdvancedSearch ?? true,
    enableNotifications: environment.features?.enableNotifications ?? false,
    enableReporting: environment.features?.enableReporting ?? true
  };

  get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.config[key];
  }

  getFeatureFlag<K extends keyof FeatureFlags>(flag: K): FeatureFlags[K] {
    return this.featureFlags[flag];
  }

  getApiUrl(): string {
    if (!environment.production) {
      console.log('🔍 ConfigService - API URL:', this.config.apiUrl);
      console.log('🔍 Environment:', environment);
    }
    return this.config.apiUrl;
  }

  isProduction(): boolean {
    return this.config.production;
  }

  getAuthConfig() {
    return this.config.auth;
  }

  getPaginationConfig() {
    return this.config.pagination;
  }

  getUiConfig() {
    return this.config.ui;
  }
}