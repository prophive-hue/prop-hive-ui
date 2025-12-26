import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminInvestorsRepository } from '../../../core/api/repositories/admin-investors.repository';
import type { Investor, PaginatedResponse } from '../../../models';
import type { InvestorPagination } from '../../../core/api/repositories/admin-investors.repository';

export type { Investor } from '../../../models';
export type { InvestorPagination } from '../../../core/api/repositories/admin-investors.repository';
export type PaginatedInvestors = PaginatedResponse<Investor>;

@Injectable({
  providedIn: 'root'
})
export class AdminInvestorsService {
  private repository = inject(AdminInvestorsRepository);

  getAllInvestors(pagination: InvestorPagination): Observable<PaginatedResponse<Investor>> {
    return this.repository.getAllInvestors(pagination);
  }

  suspendInvestor(email: string): Observable<{ message: string }> {
    return this.repository.suspendInvestor(email);
  }

  verifyInvestor(verifyData: any): Observable<{ message: string }> {
    return this.repository.verifyInvestor(verifyData);
  }
}
