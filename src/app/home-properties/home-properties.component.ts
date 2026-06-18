import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FooterComponent} from '../shared/components/footer/footer.component';
import {HeaderComponent} from '../shared/components/header/header.component';
import {PropertyListComponent} from '../shared/components/property-list/property-list.component';

@Component({
  selector: 'app-home-properties',
  imports: [
    FooterComponent,
    HeaderComponent,
    PropertyListComponent
  ],
  templateUrl: './home-properties.component.html',
  styleUrl: './home-properties.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePropertiesComponent {
}
