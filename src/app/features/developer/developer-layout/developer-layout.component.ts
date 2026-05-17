import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-developer-layout',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <div class="w-75 mx-auto mt-5 bg-light p-4 vh-100">
      <div>
        <h4>Developer Portal</h4>
        <p class="text-muted">Manage your property listings</p>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeveloperLayoutComponent {}
