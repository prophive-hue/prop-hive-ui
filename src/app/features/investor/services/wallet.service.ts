import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { WalletRepository } from '../../../core/api/repositories/wallet.repository';
import type { Wallet, WalletTransaction, DepositRequest, DepositResponse, InvestRequest, Investment, InvestorStats, FundingRound } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private repository = inject(WalletRepository);

  getWallet(userId: string): Observable<Wallet> {
    return this.repository.getWallet(userId);
  }

  initiateDeposit(userId: string, request: DepositRequest): Observable<DepositResponse> {
    return this.repository.initiateDeposit(userId, request);
  }

  getTransactions(userId: string): Observable<WalletTransaction[]> {
    return this.repository.getTransactions(userId);
  }

  invest(userId: string, request: InvestRequest): Observable<Investment> {
    return this.repository.invest(userId, request);
  }

  getInvestments(userId: string): Observable<Investment[]> {
    return this.repository.getInvestments(userId);
  }

  getInvestorStats(userId: string): Observable<InvestorStats> {
    return this.repository.getInvestorStats(userId);
  }

  getFundingRound(propertyId: string): Observable<FundingRound> {
    return this.repository.getFundingRound(propertyId);
  }
}
