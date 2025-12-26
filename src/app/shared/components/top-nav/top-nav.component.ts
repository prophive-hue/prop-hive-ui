import { Component, ChangeDetectionStrategy } from '@angular/core';
import {RouterLink} from '@angular/router';
import { PresentationComponent } from '../base/base.component';

@Component({
  selector: 'app-top-nav',
  imports: [
    RouterLink
  ],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopNavComponent extends PresentationComponent {

}
