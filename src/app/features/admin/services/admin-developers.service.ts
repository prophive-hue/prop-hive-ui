import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminDevelopersRepository } from '../../../core/api/repositories/admin-developers.repository';
import type { Developer, CreateDeveloper, PaginatedResponse } from '../../../models';
import type { DeveloperPagination } from '../../../core/api/repositories/admin-developers.repository';

export type { Developer, CreateDeveloper } from '../../../models';
export type { DeveloperPagination } from '../../../core/api/repositories/admin-developers.repository';
export type DeveloperResponse = PaginatedResponse<Developer>;

@Injectable({
  providedIn: 'root'
})
export class AdminDevelopersService {
  private repository = inject(AdminDevelopersRepository);

  getAllDevelopers(pagination: DeveloperPagination): Observable<PaginatedResponse<Developer>> {
    return this.repository.getAllDevelopers(pagination);
  }

  createDeveloper(developer: CreateDeveloper): Observable<{ message: string }> {
    return this.repository.createDeveloper(developer);
  }
}
