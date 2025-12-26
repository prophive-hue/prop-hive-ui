import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {CardModule} from 'primeng/card';
import {CurrencyPipe, DecimalPipe, NgStyle} from '@angular/common';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Pagination} from '../../admin/services/admin-properties.service';
import {AdminDeductionsService} from '../../admin/services/admin-deductions.service';
import { SmartComponent } from '../../../shared/components/base/base.component';
import { takeUntil } from 'rxjs';
import { TrackByFunctions } from '../../../shared/utils/track-by.functions';

@Component({
  selector: 'app-investor-dashboard',
  imports: [CardModule, NgStyle, FormsModule, CurrencyPipe, DecimalPipe],
  templateUrl: './investor-dashboard.component.html',
  styleUrl: './investor-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestorDashboardComponent extends SmartComponent implements OnInit {

  trackById = TrackByFunctions.trackById;

  investmentAmount: number = 0;
  roi: number = 12;
  term: number = 6;
  grossReturn: number = 0
  totalDeductions: number = 0;
  nettReturns: number = 0;
  monthlyNett: number = 0;
  totalValue: number = 0;

  loading: boolean = false;


  showInvestmentSummary: boolean = false;


  deductions: any[] = [];

  constructor(private router: Router, private deductionsService: AdminDeductionsService) {
  }

  ngOnInit() {
    this.getAllDeductions();
  }

  openProfileCompletion() {
    this.router.navigate(['investor/onboarding']).then(r => {
    })
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
    } else
      this.showInvestmentSummary = false;

  }

  calculateTotalDeductions(): number {
    let totalDeductions = 0;
    this.deductions.forEach(deduction => {
      //if (deduction.type === "Percentage") {
      totalDeductions += (deduction.value / 100) * this.grossReturn;
      // } else {
      //   totalDeductions += deduction.value;
      //}
    });

    this.totalDeductions = totalDeductions;

    return totalDeductions;
  }

  getAllDeductions() {
    const paginator: Pagination = {
      page: 0,
      size: 100
    }

    this.setLoading(true);
    this.deductionsService.getAllDeductions(paginator)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.deductions = response.content;
          this.setLoading(false);
        },
        error: (error: any) => {
          this.handleError(error);
        }
      });
  }
}
