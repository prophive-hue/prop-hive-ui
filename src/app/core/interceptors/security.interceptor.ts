import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { SanitizationService } from '../services/sanitization.service';

export const securityInterceptor: HttpInterceptorFn = (req, next) => {
  const sanitizationService = inject(SanitizationService);

  // Sanitize request body for POST/PUT requests (exclude file uploads and JSON)
  let sanitizedReq = req;
  if ((req.method === 'POST' || req.method === 'PUT') && req.body && 
      !req.headers.get('Content-Type')?.includes('multipart/form-data') &&
      !req.headers.get('Content-Type')?.includes('application/json')) {
    const sanitizedBody = sanitizeObject(req.body, sanitizationService);
    sanitizedReq = req.clone({ body: sanitizedBody });
  }

  // Add security headers
  sanitizedReq = sanitizedReq.clone({
    setHeaders: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    }
  });

  return next(sanitizedReq).pipe(
    map(event => {
      // Sanitize response data if needed
      return event;
    })
  );
};

function sanitizeObject(obj: any, sanitizationService: SanitizationService): any {
  if (obj === null || obj === undefined) return obj;
  
  if (typeof obj === 'string') {
    return sanitizationService.sanitizeInput(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item, sanitizationService));
  }
  
  if (typeof obj === 'object') {
    const sanitized: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        sanitized[key] = sanitizeObject(obj[key], sanitizationService);
      }
    }
    return sanitized;
  }
  
  return obj;
}