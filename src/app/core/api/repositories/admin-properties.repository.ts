import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base/base-http.service';
import { Property, CreateProperty, Base64File, PaginationRequest, PaginatedResponse } from '../../../models';

export interface AdminPropertiesPagination extends PaginationRequest {
  propertyName?: string;
}

export interface PropertyFilter {
  page: number;
  size: number;
  search?: string;
  category?: string;
  status?: string;
  investmentType?: string;
  managementType?: string;
  minInvestment?: number;
  maxInvestment?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminPropertiesRepository extends BaseHttpService {

  getAllProperties(pagination: AdminPropertiesPagination): Observable<PaginatedResponse<Property>> {
    return this.post<PaginatedResponse<Property>>('/property/all/home', pagination);
  }

  getFilteredProperties(filter: PropertyFilter): Observable<PaginatedResponse<Property>> {
    return this.post<PaginatedResponse<Property>>('/property/all/home/filter', filter);
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

  openFunding(propertyId: string): Observable<{ message: string }> {
    return this.put<{ message: string }>(`/property/${propertyId}/funding/open`, {});
  }

  closeFunding(propertyId: string): Observable<{ message: string }> {
    return this.put<{ message: string }>(`/property/${propertyId}/funding/close`, {});
  }
}
