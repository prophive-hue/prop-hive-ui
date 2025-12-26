import {Component, Input, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Property, PropertyCategory, PropertyStatus} from '../../features/admin/services/admin-properties.service';
import {Router} from '@angular/router';
import { PresentationComponent } from '../../shared/components/base/base.component';

@Component({
  selector: 'app-card-property',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './card-property.component.html',
  styleUrl: './card-property.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPropertyComponent extends PresentationComponent {

  constructor(private router: Router) {
    super();
  }

  @Output() propertyClick = new EventEmitter<string>();

  @Input() property: Property = {
    id: '',
    title: '',
    location: '',
    category: PropertyCategory.RESIDENTIAL,
    description: '',
    developer: '',
    expectedRoi: 0,
    totalInvestment: 0,
    status: PropertyStatus.NEW_DEVELOPMENT,
    imageUrls: []
  };

  viewProject() {
    this.router.navigate(['/property-details', this.property.id]);
  }
}
