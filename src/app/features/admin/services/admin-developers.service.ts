import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminDevelopersRepository, CreateDeveloper, Developer, DeveloperResponse, DeveloperPagination } from '../../../core/api/repositories/admin-developers.repository';

export { CreateDeveloper, Developer, DeveloperResponse, DeveloperPagination } from '../../../core/api/repositories/admin-developers.repository';

@Injectable({
  providedIn: 'root'
})
export class AdminDevelopersService {
  private repository = inject(AdminDevelopersRepository);

  getAllDevelopers(pagination: DeveloperPagination): Observable<DeveloperResponse> {
    return this.repository.getAllDevelopers(pagination);
  }

  createDeveloper(developer: CreateDeveloper): Observable<{ message: string }> {
    return this.repository.createDeveloper(developer);
  }
}
