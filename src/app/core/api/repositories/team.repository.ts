import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base/base-http.service';

export interface CreateAdminRequest {
  name: string;
  surname: string;
  email: string;
}

export interface AdminUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TeamRepository extends BaseHttpService {

  createAdmin(request: CreateAdminRequest): Observable<{ message: string }> {
    return this.post<{ message: string }>('/user/create-admin', request);
  }

  getAllAdmins(): Observable<AdminUser[]> {
    return this.get<AdminUser[]>('/user/admins');
  }
}
