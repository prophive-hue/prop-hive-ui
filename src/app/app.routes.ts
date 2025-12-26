import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './home/home-layout/home-layout.component';
import { PropertyDetailComponent } from './home/property-detail/property-detail.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { AboutComponent } from './about/about.component';
import { HomePropertiesComponent } from './home-properties/home-properties.component';

export const routes: Routes = [
  // Home route (no authentication required)
  { path: '', component: HomeLayoutComponent },

  // Lazy loaded routes
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.adminRoutes)
  },
  {
    path: 'investor',
    loadChildren: () => import('./features/investor/investor.routes').then(m => m.investorRoutes)
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
