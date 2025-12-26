import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { PropertiesComponent } from './properties/properties.component';
import { InvestorsComponent } from './investors/investors.component';
import { DevelopersComponent } from './developers/developers.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { DeductionsComponent } from './deductions/deductions.component';
import { AdminDocumentsComponent } from './admin-documents/admin-documents.component';
import { adminGuard } from '../auth/guards/admin.guard';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: 'investors', component: InvestorsComponent },
      { path: 'developers', component: DevelopersComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'properties', component: PropertiesComponent },
      { path: 'deductions', component: DeductionsComponent },
      { path: 'documents', component: AdminDocumentsComponent },
      { path: '', redirectTo: 'properties', pathMatch: 'full' }
    ]
  }
];