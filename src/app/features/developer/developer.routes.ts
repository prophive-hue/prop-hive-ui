import { Routes } from '@angular/router';
import { DeveloperLayoutComponent } from './developer-layout/developer-layout.component';
import { DeveloperPropertiesComponent } from './developer-properties/developer-properties.component';
import { developerGuard } from '../../core/guards/developer.guard';

export const developerRoutes: Routes = [
  {
    path: '',
    component: DeveloperLayoutComponent,
    canActivate: [developerGuard],
    children: [
      { path: 'properties', component: DeveloperPropertiesComponent },
      { path: '', redirectTo: 'properties', pathMatch: 'full' }
    ]
  }
];
