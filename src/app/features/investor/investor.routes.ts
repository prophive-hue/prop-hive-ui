import { Routes } from '@angular/router';
import { InvestorLayoutComponent } from './investor-layout/investor-layout.component';
import { InvestorDashboardComponent } from './investor-dashboard/investor-dashboard.component';
import { OnboardingLayoutComponent } from './onboarding/onboarding-layout/onboarding-layout.component';
import { DepositComponent } from './deposit/deposit.component';
import { investorGuard } from '../../core/guards/investor.guard';

export const investorRoutes: Routes = [
  {
    path: '',
    component: InvestorLayoutComponent,
    canActivate: [investorGuard],
    children: [
      { path: 'dashboard', component: InvestorDashboardComponent },
      { path: 'onboarding', component: OnboardingLayoutComponent },
      { path: 'deposit', component: DepositComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
