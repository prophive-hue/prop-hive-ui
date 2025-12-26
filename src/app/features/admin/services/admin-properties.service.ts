import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminPropertiesRepository } from '../../../core/api/repositories/admin-properties.repository';

export { CreateProperty, Base64File, Property, AdminPropertiesPagination, PaginatedResponse } from '../../../core/api/repositories/admin-properties.repository';

export interface ResponseMessage {
  message: string;
}

export interface PropertyResponse {
  content: Property[];
  totalElements: number;
}

export interface Pagination{
  page: number;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminPropertiesService {
  private repository = inject(AdminPropertiesRepository);

  createProperty(propertyData: CreateProperty): Observable<ResponseMessage> {
    return this.repository.createProperty(propertyData);
  }

  getAllProperties(paginator: Pagination): Observable<PropertyResponse> {
    const pagination = {
      propertyName: '',
      page: paginator.page,
      size: paginator.size
    };
    return this.repository.getAllProperties(pagination) as Observable<PropertyResponse>;
  }

  getAllHomeProperties(paginator: Pagination): Observable<PropertyResponse> {
    return this.getAllProperties(paginator);
  }

  getProperty(id: string): Observable<Property> {
    // This would need to be implemented in the repository
    throw new Error('Method not implemented in repository');
  }
}
