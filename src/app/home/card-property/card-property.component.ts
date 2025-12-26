import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Property} from '../../features/admin/services/admin-properties.service';
import {Router} from '@angular/router';
import { PresentationComponent } from '../../shared/components/base/base.component';
import { LazyLoadDirective } from '../../shared/directives/lazy-load.directive';

@Component({
  selector: 'app-card-property',
  imports: [
    NgOptimizedImage,
    LazyLoadDirective
  ],
  templateUrl: './card-property.component.html',
  styleUrl: './card-property.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPropertyComponent extends PresentationComponent {

  constructor(private router: Router) {
  }

  @Input() property: Property = {
    id: '',
    title: '',
    location: '',
    category: '',
    description: '',
    developer: '',
    expectedRoi: 0,
    totalInvestment: 0,
    status: '',
    imageUrls: []
  };

  viewProject() {
    this.router.navigate(['/property-details', this.property.id]);
  }
}
