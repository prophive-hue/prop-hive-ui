import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {MessageService} from 'primeng/api';
import Aura from '@primeng/themes/aura';
import {routes} from './app.routes';
import {authInterceptor} from './core/interceptors/auth.interceptor';
import {errorInterceptor} from './core/interceptors/global/error.interceptor';
import {cacheInterceptor} from './core/interceptors/cache.interceptor';
import {securityInterceptor} from './core/interceptors/security.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([securityInterceptor, authInterceptor, errorInterceptor, cacheInterceptor])
    ),
    provideAnimationsAsync(),
    MessageService,
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false,
          colors: {
            primary: '#3B82F6',
            secondary: '#64748B',
            surface: '#FFFFFF',
          }
        }
      },
      ripple: true
    })
  ]
};
