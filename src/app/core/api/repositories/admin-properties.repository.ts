import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base/base-http.service';
import { Property, CreateProperty, Base64File, PaginationRequest, PaginatedResponse } from '../../../models';

export interface AdminPropertiesPagination extends PaginationRequest {
  propertyName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminPropertiesRepository extends BaseHttpService {

  getAllProperties(pagination: AdminPropertiesPagination): Observable<PaginatedResponse<Property>> {
    return this.post<PaginatedResponse<Property>>('/property/all', pagination);
  }

  createProperty(property: CreateProperty): Observable<{ message: string }> {
    return this.post<{ message: string }>('/property/create', property);
  }

  approveProperty(propertyId: string): Observable<{ message: string }> {
    return this.put<{ message: string }>(`/property/${propertyId}/approve`, {});
  }

  rejectProperty(propertyId: string, reason: string): Observable<{ message: string }> {
    return this.put<{ message: string }>(`/property/${propertyId}/reject`, { reason });
  }

  getProperty(id: string): Observable<Property> {
    return this.get<Property>(`/property/${id}`);
  }

  createFundingRound(propertyId: string, targetAmount: number, deadline: string | null): Observable<{ message: string }> {
    return this.post<{ message: string }>('/investment/funding-round', { propertyId, targetAmount, deadline });
  }
}
