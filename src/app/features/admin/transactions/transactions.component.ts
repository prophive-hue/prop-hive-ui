import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { SmartComponent } from '../../../shared/components/base/base.component';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { LoaderService } from '../../../core/services/loader.service';
import { takeUntil } from 'rxjs';
import { BaseHttpService } from '../../../core/api/base/base-http.service';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
class TransactionsRepository extends BaseHttpService {
  getAllTransactions(pagination: any): Observable<any> {
    return this.post<any>('/wallet/transactions/all', pagination);
  }
}

@Component({
  selector: 'app-transactions',
  imports: [TagModule, ToolbarModule, DatePipe, CurrencyPipe, PaginatorComponent, NgxUiLoaderModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsComponent extends SmartComponent implements OnInit {

  transactions: any[] = [];
  totalElements: number = 0;
  page: number = 0;
  size: number = 10;

  private repo = inject(TransactionsRepository);
  private loader = inject(LoaderService);

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.loader.startLoader();
    this.repo.getAllTransactions({ page: this.page, size: this.size })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.transactions = response.content;
          this.totalElements = response.totalElements;
          this.loader.stopLoader();
          this.cdr.markForCheck();
        },
        error: (error) => {
          this.loader.stopLoader();
          this.handleError(error);
        }
      });
  }

  paginate(event: any) {
    this.page = event.page;
    this.size = event.rows;
    this.loadTransactions();
  }

  getTypeSeverity(type: string): string {
    switch (type) {
      case 'DEPOSIT': return 'success';
      case 'WITHDRAWAL': return 'warn';
      case 'INVESTMENT': return 'info';
      case 'RETURN': return 'success';
      case 'FEE': return 'danger';
      default: return 'info';
    }
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'PENDING': return 'warn';
      case 'FAILED': return 'danger';
      default: return 'info';
    }
  }
}
