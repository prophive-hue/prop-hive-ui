import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  protected http = inject(HttpClient);
  private configService = inject(ConfigService);
  protected baseUrl = this.configService.getApiUrl();

  protected get<T>(endpoint: string, params?: any): Observable<T> {
    const httpParams = this.buildParams(params);
    const fullUrl = `${this.baseUrl}${endpoint}`;
    console.log('🚀 HTTP GET:', fullUrl);
    return this.http.get<T>(fullUrl, { params: httpParams });
  }

  protected post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body);
  }

  protected put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body);
  }

  protected delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`);
  }

  private buildParams(params?: any): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }
    return httpParams;
  }
}