import { Component, ChangeDetectionStrategy } from '@angular/core';
import {FooterComponent} from '../shared/components/footer/footer.component';
import {HeaderComponent} from '../shared/components/header/header.component';
import { PresentationComponent } from '../shared/components/base/base.component';

@Component({
  selector: 'app-how-it-works',
  imports: [
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HowItWorksComponent extends PresentationComponent {

}
