export const environment = {
  production: false,
  apiUrl: 'https://b9otcnq1xe.execute-api.eu-west-1.amazonaws.com/dev',
  version: '1.0.0',
  buildDate: new Date().toISOString(),
  features: {
    enableNewDashboard: true,
    enableAdvancedSearch: true,
    enableNotifications: false,
    enableReporting: true
  }
};
