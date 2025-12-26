import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import {TopNavComponent} from '../top-nav/top-nav.component';
import { PresentationComponent } from '../base/base.component';

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
export class HeaderComponent extends PresentationComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    // Check auth status on initialization
    this.isLoggedIn = this.authService.isLoggedIn();
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
