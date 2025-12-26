# PropertyHiveUi

A modern Angular 19 property investment platform with comprehensive security, performance optimizations, and enterprise-grade architecture.

## 🚀 Features

### Architecture & Design Patterns
- **Lazy Loading**: Feature modules with route-based code splitting
- **Component Responsibilities**: Smart/Presentation component separation with base classes
- **Repository Pattern**: Centralized API management with BaseHttpService
- **Type Safety**: Comprehensive TypeScript interfaces, enums, and utility types
- **Clean Architecture**: Core/Features/Shared separation following Angular best practices

### Performance Optimizations
- **OnPush Change Detection**: Optimized change detection across all components
- **HTTP Caching**: 5-minute response caching with automatic cleanup
- **Lazy Loading Images**: Intersection Observer-based image loading
- **Virtual Scrolling**: Efficient rendering for large data sets
- **TrackBy Functions**: Optimized ngFor loops preventing unnecessary DOM updates
- **Bundle Analysis**: Webpack bundle analyzer integration

### Security Enhancements
- **Input Validation**: Custom validators for XSS, SQL injection, and data integrity
- **Input Sanitization**: Real-time input cleaning with directive-based sanitization
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- **Strong Password Policy**: Enforced password complexity requirements
- **File Upload Security**: Type and size validation with sanitized filenames

### Error Handling & Configuration
- **Centralized Error Handling**: Global error interceptor with user-friendly messages
- **Configuration Management**: Environment-based settings with feature flags
- **Error Classification**: Typed errors with severity levels and structured logging
- **Toast Notifications**: Automatic error display with PrimeNG integration

### Authentication & Authorization
- **JWT Authentication**: Token-based auth with refresh token support
- **Role-based Guards**: Admin, investor, and guest access control
- **Route Protection**: Comprehensive route guarding with type-safe roles

## 🏗️ Project Structure

```
src/app/
├── core/                    # Singleton services, guards, interceptors
│   ├── api/                 # HTTP services and repositories
│   ├── guards/              # Route guards (admin, auth, investor, guest)
│   ├── interceptors/        # HTTP interceptors (auth, error, cache, security)
│   └── services/            # Core services (config, error-handler, performance)
├── features/                # Feature modules with lazy loading
│   ├── admin/               # Admin panel with user/property management
│   ├── auth/                # Authentication (login, register)
│   └── investor/            # Investor dashboard and onboarding
├── shared/                  # Reusable components, directives, utilities
│   ├── components/          # Presentation components (header, footer, gallery)
│   ├── directives/          # Custom directives (lazy-load, sanitize-input)
│   ├── utils/               # Utility functions (trackBy functions)
│   └── validators/          # Security validators
├── models/                  # TypeScript interfaces, enums, types
│   ├── interfaces/          # Data interfaces (user, property, config, error)
│   ├── enums/               # Application enums
│   └── types/               # Utility types
└── environments/            # Environment configurations
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- Angular CLI 19.2.8+
- npm or yarn

### Installation
```bash
# Clone repository
git clone <repository-url>
cd prop-hive-ui

# Install dependencies
npm install

# Start development server
ng serve
```

### Development Commands
```bash
# Development server
ng serve                     # http://localhost:4200

# Build for production
ng build --configuration=production

# Run tests
ng test                      # Unit tests with Karma
ng e2e                       # End-to-end tests

# Code generation
ng generate component component-name
ng generate service service-name
ng generate guard guard-name

# Bundle analysis
npm run analyze              # Analyze bundle size
```

## 🔧 Configuration

### Environment Variables
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'https://api.example.com/dev',
  version: '1.0.0',
  features: {
    enableNewDashboard: true,
    enableAdvancedSearch: true,
    enableNotifications: false
  }
};
```

### Feature Flags
Control feature availability through environment-based configuration:
- `enableNewDashboard`: Toggle new dashboard UI
- `enableAdvancedSearch`: Enable advanced property search
- `enableNotifications`: Push notification support
- `enableReporting`: Analytics and reporting features

## 🔒 Security Features

### Input Validation
```typescript
// Custom security validators
SecurityValidators.strongPassword()     // Password complexity
SecurityValidators.noXss()             // XSS prevention
SecurityValidators.noSqlInjection()    // SQL injection protection
SecurityValidators.phoneNumber()       // Phone validation
SecurityValidators.alphanumeric()      // Alphanumeric only
```

### Input Sanitization
```html
<!-- Automatic input sanitization -->
<input appSanitizeInput [sanitizeOptions]="{type: 'email'}" />
<input appSanitizeInput [sanitizeOptions]="{alphanumericOnly: true}" />
```

## ⚡ Performance Features

### Change Detection Optimization
```typescript
// OnPush strategy for all components
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### TrackBy Functions
```typescript
// Optimized ngFor loops
trackById = TrackByFunctions.trackById;
trackByEmail = TrackByFunctions.trackByEmail;
```

### Lazy Loading
```html
<!-- Lazy load images -->
<img appLazyLoad="image-url.jpg" />
```

## 🏛️ Architecture Patterns

### Component Responsibilities
- **Smart Components**: Data management, business logic, service injection
- **Presentation Components**: UI rendering, Input/Output communication only
- **Base Classes**: `SmartComponent` and `PresentationComponent` enforce patterns

### Repository Pattern
```typescript
// Centralized API management
export class UserRepository extends BaseHttpService {
  getUsers(): Observable<User[]> {
    return this.get<User[]>('/users');
  }
}
```

### Error Handling
```typescript
// Centralized error management
this.handleError(error);  // Smart component error handling
this.errorHandler.displayError(appError);  // Service-level errors
```

## 🧪 Testing

### Unit Tests
```bash
ng test                      # Run unit tests
ng test --watch=false        # Single run
ng test --code-coverage      # With coverage report
```

### E2E Tests
```bash
ng e2e                       # Run end-to-end tests
```

## 📦 Build & Deployment

### Production Build
```bash
ng build --configuration=production
```

### Build Optimization
- Tree shaking for unused code elimination
- Lazy loading for reduced initial bundle size
- OnPush change detection for performance
- HTTP caching for reduced server requests

## 🔍 Monitoring & Analytics

### Performance Tracking
```typescript
// Built-in performance monitoring
const tracker = this.performanceService.trackPerformance('ComponentName', 'operation');
// ... operation ...
tracker(); // Logs execution time
```

### Error Tracking
- Structured error logging with timestamps
- Error classification by type and severity
- Automatic error reporting to console

## 🤝 Contributing

### Code Standards
- Follow Angular style guide
- Use OnPush change detection
- Implement proper error handling
- Add security validators to forms
- Document public APIs with JSDoc

### Component Guidelines
- Smart components: Extend `SmartComponent`
- Presentation components: Extend `PresentationComponent`
- Use trackBy functions in ngFor loops
- Implement lazy loading for images
- Add input sanitization directives

## 📚 Additional Resources

- [Angular Documentation](https://angular.dev)
- [PrimeNG Components](https://primeng.org)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Angular Security Guide](https://angular.dev/best-practices/security)

## 📄 License

This project is licensed under the MIT License.
