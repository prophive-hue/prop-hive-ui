import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import {TopNavComponent} from '../top-nav/top-nav.component';
import { SmartComponent } from '../base/base.component';
import { UserRole } from '../../../models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TopNavComponent],
  templateUrl: './header.component.html',
  styles: [`
    .navbar-nav .nav-link.active {
      font-weight: bold;
      color: #0d6efd;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends SmartComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router:Router) {
    super();
  }

  ngOnInit(): void {
    // Check auth status on initialization
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  isInvestor(): boolean {
    return this.authService.hasRole(UserRole.INVESTOR);
  }

  isAdmin(): boolean {
    return this.authService.hasRole(UserRole.ADMIN);
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      window.location.href = '/'; // Hard reload to reset application state
    });
  }

  routeHome() {
    this.router.navigateByUrl("");
  }
}
