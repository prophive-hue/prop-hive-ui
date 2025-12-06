import { Component } from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-investor-layout',
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './investor-layout.component.html',
  styleUrl: './investor-layout.component.css'
})
export class InvestorLayoutComponent {

}
