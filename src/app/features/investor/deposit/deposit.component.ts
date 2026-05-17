import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { SmartComponent } from '../../../shared/components/base/base.component';
import { WalletService } from '../services/wallet.service';
import { AuthService } from '../../auth/services/auth.service';
import { takeUntil } from 'rxjs';
import type { DepositResponse, Wallet } from '../../../models';

@Component({
  selector: 'app-deposit',
  imports: [CardModule, FormsModule, CurrencyPipe],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepositComponent extends SmartComponent {

  amount: number = 0;
  wallet: Wallet | null = null;
  private userId: string = '';

  constructor(
    private walletService: WalletService,
    private authService: AuthService
  ) {
    super();
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userId = user.id;
      this.loadWallet();
    }
  }

  private loadWallet() {
    this.walletService.getWallet(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (wallet) => {
          this.wallet = wallet;
          this.cdr.markForCheck();
        },
        error: (error) => this.handleError(error)
      });
  }

  initiateDeposit() {
    if (this.amount <= 0) return;

    this.setLoading(true);
    this.walletService.initiateDeposit(this.userId, { amount: this.amount })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: DepositResponse) => {
          this.redirectToPayFast(response);
          this.setLoading(false);
        },
        error: (error) => this.handleError(error)
      });
  }

  private redirectToPayFast(response: DepositResponse) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = response.paymentUrl;

    Object.entries(response.paymentData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }
}
