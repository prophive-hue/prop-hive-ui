import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base/base-http.service';
import type { Wallet, WalletTransaction, DepositRequest, DepositResponse, InvestRequest, Investment, InvestorStats, FundingRound } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class WalletRepository extends BaseHttpService {

  getWallet(userId: string): Observable<Wallet> {
    return this.get<Wallet>(`/wallet/${userId}`);
  }

  initiateDeposit(userId: string, request: DepositRequest): Observable<DepositResponse> {
    return this.post<DepositResponse>(`/wallet/${userId}/deposit`, request);
  }

  getTransactions(userId: string): Observable<WalletTransaction[]> {
    return this.get<WalletTransaction[]>(`/wallet/${userId}/transactions`);
  }

  invest(userId: string, request: InvestRequest): Observable<Investment> {
    return this.post<Investment>(`/investment/${userId}/invest`, request);
  }

  getInvestments(userId: string): Observable<Investment[]> {
    return this.get<Investment[]>(`/investment/${userId}/portfolio`);
  }

  getInvestorStats(userId: string): Observable<InvestorStats> {
    return this.get<InvestorStats>(`/investment/${userId}/stats`);
  }

  getFundingRound(propertyId: string): Observable<FundingRound> {
    return this.get<FundingRound>(`/investment/funding-round/${propertyId}`);
  }
}
