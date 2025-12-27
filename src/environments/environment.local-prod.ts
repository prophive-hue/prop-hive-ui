export const environment = {
  production: false,
  apiUrl: 'https://ylkgde9us8.execute-api.eu-west-1.amazonaws.com/dev',
  version: '1.0.0',
  buildDate: new Date().toISOString(),
  features: {
    enableNewDashboard: true,
    enableAdvancedSearch: true,
    enableNotifications: true,
    enableReporting: true
  }
};
