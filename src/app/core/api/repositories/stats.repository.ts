import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class StatsRepository extends BaseHttpService {

  getAdminInvestorStats(): Observable<any> {
    return this.get<any>('/stats/admin/investors');
  }
}