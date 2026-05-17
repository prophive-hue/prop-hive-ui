import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base/base-http.service';

export interface AdminDashboardStats {
  activeProperties: number;
  activePropertiesLastMonth: number;
  totalInvestors: number;
  totalInvestorsLastMonth: number;
  capitalRaised: number;
  capitalRaisedLastMonth: number;
  averageRoi: number;
  averageRoiLastMonth: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatsRepository extends BaseHttpService {

  getAdminInvestorStats(): Observable<any> {
    return this.get<any>('/stats/admin/investors');
  }

  getAdminDashboardStats(): Observable<AdminDashboardStats> {
    return this.get<AdminDashboardStats>('/stats/admin/dashboard');
  }
}
