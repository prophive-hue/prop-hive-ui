import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamRepository, CreateAdminRequest, AdminUser } from '../../../core/api/repositories/team.repository';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private repository = inject(TeamRepository);

  createAdmin(request: CreateAdminRequest): Observable<{ message: string }> {
    return this.repository.createAdmin(request);
  }

  getAllAdmins(): Observable<AdminUser[]> {
    return this.repository.getAllAdmins();
  }
}
