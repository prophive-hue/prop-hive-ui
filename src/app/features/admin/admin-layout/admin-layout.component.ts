import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {AdmiTopNavComponent} from '../admi-top-nav/admi-top-nav.component';
import {AdminStatsComponent} from '../admin-stats/admin-stats.component';

@Component({
  selector: 'app-admin-layout',
  imports: [CommonModule, RouterOutlet, HeaderComponent, AdmiTopNavComponent, AdminStatsComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
