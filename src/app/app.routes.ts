import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { PropertiesComponent } from './admin/properties/properties.component';
import { InvestorsComponent } from './admin/investors/investors.component';
import { DevelopersComponent } from './admin/developers/developers.component';
import { AnalyticsComponent } from './admin/analytics/analytics.component';
import {InvestorLayoutComponent} from './investor/investor-layout/investor-layout.component';
import {InvestorDashboardComponent} from './investor/investor-dashboard/investor-dashboard.component';
import {OnboardingLayoutComponent} from './investor/onboarding/onboarding-layout/onboarding-layout.component';
import {HomeLayoutComponent} from './home/home-layout/home-layout.component';
import {PropertyDetailComponent} from './home/property-detail/property-detail.component';
import {DeductionsComponent} from './admin/deductions/deductions.component';
import {HowItWorksComponent} from './how-it-works/how-it-works.component';
import {AboutComponent} from './about/about.component';
import {HomePropertiesComponent} from './home-properties/home-properties.component';
import {AdminDocumentsComponent} from './admin/admin-documents/admin-documents.component';

export const routes: Routes = [
  // Home route (no authentication required)
  { path: '', component: HomeLayoutComponent },

  // Auth routes
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'investors', component: InvestorsComponent },
      { path: 'developers', component: DevelopersComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'properties', component: PropertiesComponent },
      { path: 'deductions', component: DeductionsComponent },
      { path: 'documents', component: AdminDocumentsComponent },
      { path: '', redirectTo: 'properties', pathMatch: 'full' }
    ]
  },
  {
    path: 'investor',
    component: InvestorLayoutComponent,
    children: [
      { path: 'dashboard', component: InvestorDashboardComponent },
      { path: 'onboarding', component: OnboardingLayoutComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  {
    path: 'property-details/:id',
    component: PropertyDetailComponent
  },

  {
    path: 'how-it-works',
    component: HowItWorksComponent
  },

  {
    path: 'about',
    component: AboutComponent
  },

  {
    path: 'home-properties',
    component: HomePropertiesComponent
  },

  // Fallback route
  { path: '**', redirectTo: '' }
];
