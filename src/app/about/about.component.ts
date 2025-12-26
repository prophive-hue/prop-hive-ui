import { Component, ChangeDetectionStrategy } from '@angular/core';
import {FooterComponent} from '../shared/components/footer/footer.component';
import {HeaderComponent} from '../shared/components/header/header.component';
import { PresentationComponent } from '../shared/components/base/base.component';

@Component({
  selector: 'app-about',
  imports: [
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent extends PresentationComponent {

}
