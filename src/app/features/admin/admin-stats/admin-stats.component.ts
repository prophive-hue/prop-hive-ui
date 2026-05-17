import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Card } from 'primeng/card';
import { DecimalPipe } from '@angular/common';
import { SmartComponent } from '../../../shared/components/base/base.component';
import { StatsService } from '../services/stats.service';
import { takeUntil } from 'rxjs';
import type { AdminDashboardStats } from '../../../core/api/repositories/stats.repository';

@Component({
  selector: 'app-admin-stats',
  imports: [Card, DecimalPipe],
  templateUrl: './admin-stats.component.html',
  styleUrl: './admin-stats.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminStatsComponent extends SmartComponent implements OnInit {

  stats: AdminDashboardStats | null = null;

  constructor(private statsService: StatsService) {
    super();
  }

  ngOnInit() {
    this.statsService.getAdminDashboardStats()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats) => {
          this.stats = stats;
          this.cdr.markForCheck();
        },
        error: (error) => this.handleError(error)
      });
  }

  get propertiesDiff(): number {
    if (!this.stats) return 0;
    return this.stats.activeProperties - this.stats.activePropertiesLastMonth;
  }

  get investorsDiff(): number {
    if (!this.stats) return 0;
    return this.stats.totalInvestors - this.stats.totalInvestorsLastMonth;
  }

  get capitalDiffPercent(): number {
    if (!this.stats || this.stats.capitalRaisedLastMonth === 0) return 0;
    return ((this.stats.capitalRaised - this.stats.capitalRaisedLastMonth)
      / this.stats.capitalRaisedLastMonth) * 100;
  }

  get roiDiff(): number {
    if (!this.stats) return 0;
    return this.stats.averageRoi - this.stats.averageRoiLastMonth;
  }

  formatCapital(value: number): string {
    if (value >= 1000000) return 'R ' + (value / 1000000).toFixed(1) + 'M';
    if (value >= 1000) return 'R ' + (value / 1000).toFixed(0) + 'K';
    return 'R ' + value.toFixed(0);
  }
}
