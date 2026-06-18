import {Component, Input, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {DecimalPipe, NgIf} from '@angular/common';
import {Property, PropertyCategory, PropertyStatus} from '../../features/admin/services/admin-properties.service';
import {Router} from '@angular/router';
import { PresentationComponent } from '../../shared/components/base/base.component';

@Component({
  selector: 'app-card-property',
  imports: [
    DecimalPipe,
    NgIf
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
  @Output() favoriteToggle = new EventEmitter<{ propertyId: string; favorited: boolean }>();

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

  @Input() isFavorited = false;
  @Input() showFavoriteButton = true;
  imageLoaded = false;

  viewProject() {
    this.router.navigate(['/property-details', this.property.id]);
  }

  viewDeveloper(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/property-details', this.property.id], { queryParams: { showDeveloper: true } });
  }

  toggleFavorite(event: Event) {
    event.stopPropagation();
    this.isFavorited = !this.isFavorited;
    this.favoriteToggle.emit({ propertyId: this.property.id, favorited: this.isFavorited });
  }

  getStatusClass(): string {
    switch (this.property.status) {
      case PropertyStatus.NEW_DEVELOPMENT: return 'badge-status-blue';
      case PropertyStatus.UNDER_CONSTRUCTION: return 'badge-status-orange';
      case PropertyStatus.PRE_SALE: return 'badge-status-green';
      case PropertyStatus.JOINT_VENTURES: return 'badge-status-purple';
      default: return 'badge-status-blue';
    }
  }

  getTrendBadge(): string | null {
    const progress = this.property.fundingProgress || 0;
    if (progress >= 90) return '🔥 Almost Funded';
    if (progress >= 70) return '🚀 Trending';

    if (this.property.createdAt) {
      const created = new Date(this.property.createdAt);
      const daysSince = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince <= 7) return '✨ New';
    }
    return null;
  }
}
