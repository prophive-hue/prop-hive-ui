import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { map, shareReplay } from 'rxjs';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly DEFAULT_CACHE_TIME = 5 * 60 * 1000; // 5 minutes
  private cleanupInterval: any;

  constructor() {
    // Auto cleanup every 10 minutes
    this.cleanupInterval = setInterval(() => this.cleanupExpiredCache(), 10 * 60 * 1000);
  }

  // Cache HTTP responses
  cacheResponse<T>(key: string, data: T, cacheTime = this.DEFAULT_CACHE_TIME): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + cacheTime
    };
    this.cache.set(key, entry);
  }

  // Get cached response
  getCachedResponse<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry || Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }

  // Clear cache
  clearCache(key?: string): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  // Memory cleanup
  cleanupExpiredCache(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiry) {
        this.cache.delete(key);
      }
    }
  }

  // Track component performance
  trackPerformance(componentName: string, operation: string): () => void {
    const start = performance.now();
    return () => {
      const end = performance.now();
      console.log(`${componentName}.${operation}: ${(end - start).toFixed(2)}ms`);
    };
  }
}