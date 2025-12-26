import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';
import {HeaderComponent} from '../../../shared/components/header/header.component';
import {AdmiTopNavComponent} from '../admi-top-nav/admi-top-nav.component';
import {AdminStatsComponent} from '../admin-stats/admin-stats.component';
import { PresentationComponent } from '../../../shared/components/base/base.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, AdmiTopNavComponent, AdminStatsComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLayoutComponent extends PresentationComponent {

}
