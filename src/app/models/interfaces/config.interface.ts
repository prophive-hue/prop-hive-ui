export interface AppConfig {
  production: boolean;
  apiUrl: string;
  apiTimeout: number;
  enableLogging: boolean;
  enableAnalytics: boolean;
  maxFileSize: number;
  supportedFileTypes: string[];
  pagination: {
    defaultPageSize: number;
    maxPageSize: number;
  };
  auth: {
    tokenKey: string;
    refreshTokenKey: string;
    tokenExpiryBuffer: number;
  };
  ui: {
    theme: string;
    language: string;
    dateFormat: string;
    currency: string;
  };
}

export interface FeatureFlags {
  enableNewDashboard: boolean;
  enableAdvancedSearch: boolean;
  enableNotifications: boolean;
  enableReporting: boolean;
}