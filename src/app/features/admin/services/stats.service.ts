import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { StatsRepository } from '../../../core/api/repositories/stats.repository';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private repository = inject(StatsRepository);

  getAdminInvestorStats(): Observable<any> {
    return this.repository.getAdminInvestorStats();
  }
}
