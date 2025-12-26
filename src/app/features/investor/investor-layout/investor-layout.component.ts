import { Component } from '@angular/core';
import {HeaderComponent} from '../../../shared/components/header/header.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-investor-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './investor-layout.component.html',
  styleUrl: './investor-layout.component.css'
})
export class InvestorLayoutComponent {

}
