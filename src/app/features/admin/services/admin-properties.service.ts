import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminPropertiesRepository } from '../../../core/api/repositories/admin-properties.repository';
import type { Property, CreateProperty, PaginatedResponse } from '../../../models';

export type { Property, CreateProperty, PaginatedResponse } from '../../../models';
export { PropertyCategory, PropertyStatus } from '../../../models';
export type { Base64File } from '../../../models';

import type { AdminPropertiesPagination } from '../../../core/api/repositories/admin-properties.repository';

export interface ResponseMessage {
  message: string;
}

export interface Pagination{
  page: number;
  size: number;
}

export type { AdminPropertiesPagination };

@Injectable({
  providedIn: 'root'
})
export class AdminPropertiesService {
  private repository = inject(AdminPropertiesRepository);

  createProperty(propertyData: CreateProperty): Observable<ResponseMessage> {
    return this.repository.createProperty(propertyData);
  }

  getAllProperties(paginator: Pagination): Observable<PaginatedResponse<Property>> {
    const pagination = {
      propertyName: '',
      page: paginator.page,
      size: paginator.size
    };
    return this.repository.getAllProperties(pagination);
  }

  getAllHomeProperties(paginator: Pagination): Observable<PaginatedResponse<Property>> {
    return this.getAllProperties(paginator);
  }

  getProperty(id: string): Observable<Property> {
    return this.repository.getProperty(id);
  }
}
