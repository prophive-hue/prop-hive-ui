import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {CardModule} from 'primeng/card';
import {CurrencyPipe, DecimalPipe, NgStyle, DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Pagination} from '../../admin/services/admin-properties.service';
import {AdminDeductionsService} from '../../admin/services/admin-deductions.service';
import {WalletService} from '../services/wallet.service';
import {AuthService} from '../../auth/services/auth.service';
import {SmartComponent} from '../../../shared/components/base/base.component';
import {takeUntil} from 'rxjs';
import {TrackByFunctions} from '../../../shared/utils/track-by.functions';
import type {InvestorStats, Investment, Wallet, WalletTransaction} from '../../../models';

@Component({
  selector: 'app-investor-dashboard',
  imports: [CardModule, NgStyle, FormsModule, CurrencyPipe, DecimalPipe, DatePipe],
  templateUrl: './investor-dashboard.component.html',
  styleUrl: './investor-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestorDashboardComponent extends SmartComponent implements OnInit {

  trackById = TrackByFunctions.trackById;

  investmentAmount: number = 0;
  roi: number = 12;
  term: number = 6;
  grossReturn: number = 0;
  totalDeductions: number = 0;
  nettReturns: number = 0;
  monthlyNett: number = 0;
  totalValue: number = 0;

  override loading: boolean = false;
  showInvestmentSummary: boolean = false;

  deductions: any[] = [];
  stats: InvestorStats | null = null;
  investments: Investment[] = [];
  wallet: Wallet | null = null;
  transactions: WalletTransaction[] = [];

  private userId: string = '';

  constructor(
    private router: Router,
    private deductionsService: AdminDeductionsService,
    private walletService: WalletService,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userId = user.id;
      this.loadDashboardData();
    }
  }

  private loadDashboardData() {
    this.getAllDeductions();
    this.loadStats();
    this.loadInvestments();
    this.loadWallet();
    this.loadTransactions();
  }

  openProfileCompletion() {
    this.router.navigate(['investor/onboarding']);
  }

  onInvestmentChange(newValue: number) {
    this.investmentAmount = newValue;
    this.calculateReturns();
  }

  onRoiChange(newValue: number) {
    this.roi = newValue;
    this.calculateReturns();
  }

  onTermChange(newValue: number) {
    this.term = newValue;
    this.calculateReturns();
  }

  calculateReturns() {
    if (this.investmentAmount > 0 && this.roi > 0 && this.term > 0) {
      this.grossReturn = this.investmentAmount * (((this.roi / 100) / 12) * this.term);
      this.nettReturns = this.grossReturn - this.calculateTotalDeductions();
      this.monthlyNett = this.nettReturns / 12;
      this.totalValue = this.investmentAmount + this.nettReturns;
      this.showInvestmentSummary = true;
    } else {
      this.showInvestmentSummary = false;
    }
  }

  calculateTotalDeductions(): number {
    let totalDeductions = 0;
    this.deductions.forEach(deduction => {
      totalDeductions += (deduction.value / 100) * this.grossReturn;
    });
    this.totalDeductions = totalDeductions;
    return totalDeductions;
  }

  getAllDeductions() {
    const paginator: Pagination = { page: 0, size: 100 };
    this.deductionsService.getAllDeductions(paginator)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.deductions = response.content;
          this.cdr.markForCheck();
        },
        error: (error: any) => this.handleError(error)
      });
  }

  private loadStats() {
    this.walletService.getInvestorStats(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats) => {
          this.stats = stats;
          this.cdr.markForCheck();
        },
        error: (error: any) => this.handleError(error)
      });
  }

  private loadInvestments() {
    this.walletService.getInvestments(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (investments) => {
          this.investments = investments;
          this.cdr.markForCheck();
        },
        error: (error: any) => this.handleError(error)
      });
  }

  private loadWallet() {
    this.walletService.getWallet(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (wallet) => {
          this.wallet = wallet;
          this.cdr.markForCheck();
        },
        error: (error: any) => this.handleError(error)
      });
  }

  deposit() {
    this.router.navigate(['investor/deposit']);
  }

  private loadTransactions() {
    this.walletService.getTransactions(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (transactions) => {
          this.transactions = transactions;
          this.cdr.markForCheck();
        },
        error: (error: any) => this.handleError(error)
      });
  }
}
