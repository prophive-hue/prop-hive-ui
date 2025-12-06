import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Property} from '../../admin/services/admin-properties.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card-property',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './card-property.component.html',
  styleUrl: './card-property.component.css'
})
export class CardPropertyComponent {

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
