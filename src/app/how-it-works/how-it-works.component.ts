import { Component } from '@angular/core';
import {TopNavComponent} from '../shared/top-nav/top-nav.component';
import {FooterComponent} from '../shared/footer/footer.component';
import {HeaderComponent} from '../shared/header/header.component';

@Component({
  selector: 'app-how-it-works',
  imports: [
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.css'
})
export class HowItWorksComponent {

}
