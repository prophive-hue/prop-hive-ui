import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="container-fluid auth-container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5">
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
