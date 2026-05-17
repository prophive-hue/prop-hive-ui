import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="container-fluid auth-container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5">
          <div class="mb-3">
            <a routerLink="/" class="text-decoration-none">
              <i class="bi bi-arrow-left"></i> Back to Home
            </a>
          </div>
          <div class="card shadow-lg">
            <div class="card-body p-4 p-sm-5">
              <router-outlet></router-outlet>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      background-color: #f8f9fa;
    }
  `]
})
export class AuthLayoutComponent {}
