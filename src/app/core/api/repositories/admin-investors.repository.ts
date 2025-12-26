import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base/base-http.service';
import { Investor, PaginationRequest, PaginatedResponse } from '../../models';

export interface InvestorPagination extends PaginationRequest {
  investorName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminInvestorsRepository extends BaseHttpService {

  getAllInvestors(pagination: InvestorPagination): Observable<PaginatedResponse<Investor>> {
    return this.post<PaginatedResponse<Investor>>('/investor/all', pagination);
  }

  suspendInvestor(email: string): Observable<{ message: string }> {
    return this.put<{ message: string }>(`/investor/suspend/${email}`, null);
  }

  verifyInvestor(verifyData: any): Observable<{ message: string }> {
    return this.put<{ message: string }>('/investor/verify', verifyData);
  }
}