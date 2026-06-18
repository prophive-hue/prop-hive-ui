import {Component, OnInit, ChangeDetectionStrategy, inject} from '@angular/core';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {CardPropertyComponent} from '../../../home/card-property/card-property.component';
import {AdminPropertiesService, PropertyFilter, Property} from '../../../features/admin/services/admin-properties.service';
import {PaginatedResponse, UserRole} from '../../../models';
import {ConstantsService} from '../../../core/services/constants.service';
import {LoaderService} from '../../../core/services/loader.service';
import {SmartComponent} from '../base/base.component';
import {takeUntil} from 'rxjs';
import {AuthService} from '../../../features/auth/services/auth.service';
import {FavoritesRepository} from '../../../core/api/repositories/favorites.repository';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    CardPropertyComponent,
    NgxUiLoaderModule
  ],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyListComponent extends SmartComponent implements OnInit {

  private authService = inject(AuthService);
  private favoritesRepo = inject(FavoritesRepository);
  private router = inject(Router);
  private propertiesService = inject(AdminPropertiesService);
  private constants = inject(ConstantsService);
  private loader = inject(LoaderService);

  investmentTypes: string[] = [];
  propertyCompletionTypes: string[] = [];
  propertyTypes: string[] = [];
  propertyValues: string[] = [];
  managementTypes: string[] = [];

  features = [
    { title: 'Residential', icon: 'bi bi-house' },
    { title: 'Commercial', icon: 'bi bi-building' },
    { title: 'Hospitality', icon: 'bi bi-building' },
    { title: 'Mixed-Use', icon: 'bi bi-buildings' },
    { title: 'Student Accommodation', icon: 'bi bi-buildings' }
  ];

  properties: Property[] = [];
  page: number = 0;
  size: number = 5;
  favoriteIds: Set<string> = new Set();
  showFavorites: boolean = true;

  searchQuery: string = '';
  selectedInvestmentType: string = '';
  selectedProjectType: string = '';
  selectedPropertyType: string = '';
  selectedPropertyValue: string = '';
  selectedManagementType: string = '';

  ngOnInit() {
    this.showFavorites = this.canShowFavorites();
    this.investmentTypes = this.constants.investmentTypes();
    this.propertyCompletionTypes = this.constants.propertyCompletionTypes();
    this.propertyTypes = this.constants.propertyTypes();
    this.propertyValues = this.constants.propertyValues();
    this.managementTypes = this.constants.propertyManagementTypes();

    this.getProperties();
    this.loadFavorites();
  }

  getProperties() {
    this.setLoading(true);
    this.loader.startLoader();

    const valueRanges: { [key: string]: { min: number; max: number } } = {
      'R5k-50k': { min: 5000, max: 50000 },
      'R50k-250k': { min: 50000, max: 250000 },
      'R250k-R1M': { min: 250000, max: 1000000 },
      'R1M-R5M': { min: 1000000, max: 5000000 },
      'R5M+': { min: 5000000, max: 999999999 }
    };

    const categoryMap: { [key: string]: string } = {
      'Residential': 'RESIDENTIAL',
      'Commercial': 'COMMERCIAL',
      'Hospitality': 'HOSPITALITY',
      'Mixed-Use': 'MIXED_USE',
      'Student Accommodation': 'STUDENT_ACCOMMODATION'
    };

    const statusMap: { [key: string]: string } = {
      'New Development Projects': 'NEW_DEVELOPMENT',
      'Pre-Sale Investment': 'PRE_SALE_INVESTMENT',
      'Under Construction': 'UNDER_CONSTRUCTION',
      'Joint Ventures': 'JOINT_VENTURES'
    };

    const investmentTypeMap: { [key: string]: string } = {
      'Passive Income': 'PASSIVE_INCOME',
      'Capital Growth': 'CAPITAL_GROWTH',
      'Hybrid Investment': 'HYBRID_INVESTMENT'
    };

    const managementTypeMap: { [key: string]: string } = {
      'Fully Managed': 'FULLY_MANAGED',
      'Self Managed': 'SELF_MANAGED'
    };

    const range = this.selectedPropertyValue ? valueRanges[this.selectedPropertyValue] : null;

    const filter: PropertyFilter = {
      page: this.page,
      size: this.size,
      search: this.searchQuery || undefined,
      category: this.selectedPropertyType ? categoryMap[this.selectedPropertyType] : undefined,
      status: this.selectedProjectType ? statusMap[this.selectedProjectType] : undefined,
      investmentType: this.selectedInvestmentType ? investmentTypeMap[this.selectedInvestmentType] : undefined,
      managementType: this.selectedManagementType ? managementTypeMap[this.selectedManagementType] : undefined,
      minInvestment: range?.min,
      maxInvestment: range?.max
    };

    this.propertiesService.getFilteredProperties(filter)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: PaginatedResponse<Property>) => {
          this.properties = response.content;
          this.setLoading(false);
          this.loader.stopLoader();
        },
        error: (error: Error) => {
          this.loader.stopLoader();
          this.handleError(error);
        }
      });
  }

  onFilterChange() {
    this.page = 0;
    this.getProperties();
  }

  onSearch() {
    this.page = 0;
    this.getProperties();
  }

  filterByCategory(category: string) {
    if (this.selectedPropertyType === category) {
      this.selectedPropertyType = '';
    } else {
      this.selectedPropertyType = category;
    }
    this.page = 0;
    this.getProperties();
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.getProperties();
    }
  }

  nextPage() {
    if (this.properties.length === this.size) {
      this.page++;
      this.getProperties();
    }
  }

  canShowFavorites(): boolean {
    if (!this.authService.isLoggedIn()) return true;
    return this.authService.hasRole(UserRole.INVESTOR);
  }

  isFavorited(propertyId: string): boolean {
    return this.favoriteIds.has(propertyId);
  }

  onFavoriteToggle(event: { propertyId: string; favorited: boolean }) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }

    const userId = this.authService.getCurrentUser()?.id;
    if (!userId) return;

    if (event.favorited) {
      this.favoriteIds.add(event.propertyId);
      this.favoritesRepo.addFavorite(userId, event.propertyId)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    } else {
      this.favoriteIds.delete(event.propertyId);
      this.favoritesRepo.removeFavorite(userId, event.propertyId)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }
  }

  private loadFavorites() {
    if (!this.authService.isLoggedIn() || !this.authService.hasRole(UserRole.INVESTOR)) return;

    const userId = this.authService.getCurrentUser()?.id;
    if (!userId) return;

    this.favoritesRepo.getFavorites(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (ids) => {
          this.favoriteIds = new Set(ids);
          this.cdr.markForCheck();
        }
      });
  }
}
