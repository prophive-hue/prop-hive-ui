import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { StatsRepository, AdminDashboardStats } from '../../../core/api/repositories/stats.repository';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private repository = inject(StatsRepository);

  getAdminInvestorStats(): Observable<any> {
    return this.repository.getAdminInvestorStats();
  }

  getAdminDashboardStats(): Observable<AdminDashboardStats> {
    return this.repository.getAdminDashboardStats();
  }
}
