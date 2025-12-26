import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap, of, Observable } from 'rxjs';
import { PerformanceService } from '../services/performance.service';

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const performanceService = inject(PerformanceService);

  // Only cache GET requests
  if (req.method !== 'GET') {
    return next(req);
  }

  // Check for cached response
  const cacheKey = req.urlWithParams;
  const cachedResponse = performanceService.getCachedResponse(cacheKey);
  
  if (cachedResponse) {
    return of(cachedResponse) as Observable<any>;
  }

  // Make request and cache response
  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse && event.status === 200) {
        performanceService.cacheResponse(cacheKey, event);
      }
    })
  );
};