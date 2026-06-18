import {Component, OnInit, ChangeDetectionStrategy, inject} from '@angular/core';
import {CardModule} from 'primeng/card';
import {CurrencyPipe, DecimalPipe, DatePipe, NgClass} from '@angular/common';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Pagination} from '../../admin/services/admin-properties.service';
import {AdminDeductionsService} from '../../admin/services/admin-deductions.service';
import {WalletService} from '../services/wallet.service';
import {AuthService} from '../../auth/services/auth.service';
import {SmartComponent} from '../../../shared/components/base/base.component';
import {takeUntil} from 'rxjs';
import {FavoritesRepository} from '../../../core/api/repositories/favorites.repository';
import {AdminPropertiesService} from '../../admin/services/admin-properties.service';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import type {InvestorStats, Investment, Wallet, WalletTransaction} from '../../../models';
import type {Property} from '../../../models';

@Component({
  selector: 'app-investor-dashboard',
  imports: [CardModule, NgClass, FormsModule, CurrencyPipe, DecimalPipe, DatePipe, ToastModule],
  providers: [MessageService],
  templateUrl: './investor-dashboard.component.html',
  styleUrl: './investor-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestorDashboardComponent extends SmartComponent implements OnInit {

  // Calculator
  investmentAmount: number = 0;
  roi: number = 12;
  term: number = 6;
  grossReturn: number = 0;
  totalDeductions: number = 0;
  nettReturns: number = 0;
  monthlyNett: number = 0;
  totalValue: number = 0;
  showInvestmentSummary: boolean = false;

  // Dashboard data
  deductions: any[] = [];
  stats: InvestorStats | null = null;
  investments: Investment[] = [];
  wallet: Wallet | null = null;
  transactions: WalletTransaction[] = [];
  savedProperties: Property[] = [];

  // Withdraw
  showWithdrawModal = false;
  withdrawAmount: number = 0;

  // Active tab
  activeTab: 'investments' | 'saved' | 'transactions' | 'calculator' = 'investments';

  private userId: string = '';
  private favoritesRepo = inject(FavoritesRepository);
  private propertiesService = inject(AdminPropertiesService);
  private messageService = inject(MessageService);

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
    this.loadSavedProperties();
  }

  openProfileCompletion() {
    this.router.navigate(['investor/onboarding']);
  }

  // Tab navigation
  setTab(tab: 'investments' | 'saved' | 'transactions' | 'calculator') {
    this.activeTab = tab;
  }

  // Calculator
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

  // Withdraw
  openWithdraw() {
    this.withdrawAmount = 0;
    this.showWithdrawModal = true;
  }

  confirmWithdraw() {
    if (this.withdrawAmount <= 0 || this.withdrawAmount > (this.wallet?.balance || 0)) return;

    this.walletService.withdraw(this.userId, this.withdrawAmount)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.showWithdrawModal = false;
          this.loadWallet();
          this.loadTransactions();
          this.messageService.add({
            severity: 'success',
            summary: 'Withdrawal Requested',
            detail: 'Your withdrawal is being processed.',
            key: 'tl',
            life: 5000
          });
        },
        error: (error: any) => {
          this.messageService.add({
            severity: 'warn',
            summary: 'Withdrawal Failed',
            detail: error?.message || 'Something went wrong',
            key: 'tl',
            life: 5000
          });
        }
      });
  }

  // Saved properties
  viewProperty(id: string) {
    this.router.navigate(['/property-details', id]);
  }

  removeFavorite(propertyId: string) {
    this.favoritesRepo.removeFavorite(this.userId, propertyId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.savedProperties = this.savedProperties.filter(p => p.id !== propertyId);
          this.cdr.markForCheck();
        }
      });
  }

  // Investment status
  getStatusClass(status: string): string {
    switch (status) {
      case 'ACTIVE': return 'bg-success';
      case 'MATURED': return 'bg-info';
      case 'CANCELLED': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  // Portfolio breakdown
  getPortfolioAllocation(): { title: string; percentage: number; amount: number }[] {
    if (!this.investments.length) return [];
    const total = this.investments.reduce((sum, inv) => sum + inv.amount, 0);
    return this.investments.map(inv => ({
      title: inv.propertyTitle,
      percentage: (inv.amount / total) * 100,
      amount: inv.amount
    }));
  }

  deposit() {
    this.router.navigate(['investor/deposit']);
  }

  // Data loading
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
        error: () => {}
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
        error: () => {}
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
        error: () => {}
      });
  }

  private loadTransactions() {
    this.walletService.getTransactions(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (transactions) => {
          this.transactions = transactions;
          this.cdr.markForCheck();
        },
        error: () => {}
      });
  }

  private loadSavedProperties() {
    this.favoritesRepo.getFavorites(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (ids) => {
          ids.forEach(id => {
            this.propertiesService.getProperty(id)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: (property) => {
                  this.savedProperties.push(property);
                  this.cdr.markForCheck();
                }
              });
          });
        }
      });
  }
}
