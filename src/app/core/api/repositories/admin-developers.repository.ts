import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base/base-http.service';
import { Developer, CreateDeveloper, PaginationRequest, PaginatedResponse } from '../../models';

export interface DeveloperPagination extends PaginationRequest {
  companyName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminDevelopersRepository extends BaseHttpService {

  getAllDevelopers(pagination: DeveloperPagination): Observable<PaginatedResponse<Developer>> {
    return this.post<PaginatedResponse<Developer>>('/developer/all', pagination);
  }

  createDeveloper(developer: CreateDeveloper): Observable<{ message: string }> {
    return this.post<{ message: string }>('/developer/create', developer);
  }
}