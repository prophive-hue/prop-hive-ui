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
    return this.post<{ message: string }>('/property', property);
  }

  updateProperty(id: string, property: Partial<CreateProperty>): Observable<{ message: string }> {
    return this.put<{ message: string }>(`/property/${id}`, property);
  }

  deleteProperty(id: string): Observable<{ message: string }> {
    return this.delete<{ message: string }>(`/property/${id}`);
  }

  getProperty(id: string): Observable<Property> {
    return this.get<Property>(`/property/${id}`);
  }
}
