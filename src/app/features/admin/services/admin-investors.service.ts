import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminInvestorsRepository, Investor, InvestorPagination, PaginatedInvestors } from '../../../core/api/repositories/admin-investors.repository';

export { Investor, InvestorPagination, PaginatedInvestors } from '../../../core/api/repositories/admin-investors.repository';

@Injectable({
  providedIn: 'root'
})
export class AdminInvestorsService {
  private repository = inject(AdminInvestorsRepository);

  getAllInvestors(pagination: InvestorPagination): Observable<PaginatedInvestors> {
    return this.repository.getAllInvestors(pagination);
  }

  suspendInvestor(email: string): Observable<{ message: string }> {
    return this.repository.suspendInvestor(email);
  }

  verifyInvestor(verifyData: any): Observable<{ message: string }> {
    return this.repository.verifyInvestor(verifyData);
  }
}
