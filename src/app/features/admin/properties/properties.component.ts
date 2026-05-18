import {Component, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {Button} from 'primeng/button';
import {Tag} from 'primeng/tag';
import {Toast} from 'primeng/toast';
import {Toolbar} from 'primeng/toolbar';
import {SlicePipe, NgIf} from '@angular/common';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {CustomerService} from '../services/customer.service';
import {DialogPropertyCreateComponent} from '../dialog/dialog-property-create/dialog-property-create.component';
import {
  AdminPropertiesPagination,
  AdminPropertiesService,
  Base64File,
  CreateProperty,
  Property
} from '../services/admin-properties.service';
import {MessageService} from 'primeng/api';
import {GalleryComponent} from '../../../shared/components/gallery/gallery.component';
import {SearchButtonComponent} from '../../../shared/components/search-button/search-button.component';
import {PaginatorComponent} from '../../../shared/components/paginator/paginator.component';
import {LoaderService} from '../../../core/services/loader.service';
import {FormsModule} from '@angular/forms';
import { SmartComponent } from '../../../shared/components/base/base.component';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { TrackByFunctions } from '../../../shared/utils/track-by.functions';

@Component({
  selector: 'app-properties',
  imports: [
    DialogPropertyCreateComponent,
    GalleryComponent,
    Toast,
    Tag,
    SlicePipe,
    NgIf,
    FormsModule,
    Toolbar,
    Button,
    SearchButtonComponent,
    PaginatorComponent,
    NgxUiLoaderModule
  ],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css',
  providers: [CustomerService, AdminPropertiesService, MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesComponent extends SmartComponent implements OnInit {

  trackById = TrackByFunctions.trackById;


  @ViewChild('dialog') dialogComponent!: DialogPropertyCreateComponent;

  @ViewChild('pictures') picturesComponent!: GalleryComponent


  selectedPropertyImages: string[] = [];

  statuses!: any[];

  properties: Property[] = [];

  totalElements: number = 0;
  page: number = 0;
  size: number = 5;

  searchPropertiesInput: string = '';

  showFundingModal = false;
  selectedFundingProperty: Property | null = null;
  fundingTargetAmount: number = 0;
  fundingDeadline: string = '';


  constructor(private propertiesService: AdminPropertiesService, private messageService: MessageService, private loader: LoaderService) {
    super();
  }

  ngOnInit() {
    this.getAllProperties();
  }


  getSeverity(status: string) {
    switch (status) {
      case 'New Development':
        return 'danger';

      case 'Joint Ventures':
        return 'success';

      case 'Under Construction':
        return 'warn';

      case 'Pre-Sale Investment':
        return 'info';

      default:
        return '';
    }
  }

  getApprovalSeverity(status: string) {
    switch (status) {
      case 'APPROVED': return 'success';
      case 'PENDING_REVIEW': return 'warn';
      case 'REJECTED': return 'danger';
      default: return 'info';
    }
  }

  approveProperty(property: Property) {
    this.loader.startLoader();
    this.propertiesService.approveProperty(property.id).subscribe({
      next: (response) => {
        this.loader.stopLoader();
        this.getAllProperties();
        this.messageService.add({
          severity: 'success',
          summary: 'Approved',
          detail: response.message,
          key: 'tl',
          life: 5000
        });
      },
      error: (error: Error) => {
        this.loader.stopLoader();
        this.messageService.add({
          severity: 'warn',
          summary: 'Error',
          detail: error.message,
          key: 'tl',
          life: 5000
        });
      }
    });
  }

  rejectProperty(property: Property) {
    const reason = prompt('Rejection reason:');
    if (reason === null) return;

    this.loader.startLoader();
    this.propertiesService.rejectProperty(property.id, reason).subscribe({
      next: (response) => {
        this.loader.stopLoader();
        this.getAllProperties();
        this.messageService.add({
          severity: 'success',
          summary: 'Rejected',
          detail: response.message,
          key: 'tl',
          life: 5000
        });
      },
      error: (error: Error) => {
        this.loader.stopLoader();
        this.messageService.add({
          severity: 'warn',
          summary: 'Error',
          detail: error.message,
          key: 'tl',
          life: 5000
        });
      }
    });
  }

  getAllProperties() {
    const paginator: AdminPropertiesPagination = {
      propertyName: this.searchPropertiesInput,
      page: this.page,
      size: this.size
    }

    this.loader.startLoader();
    this.propertiesService.getAllProperties(paginator)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.properties = response.content;
          this.totalElements = response.totalElements;
          this.loader.stopLoader();
          this.cdr.markForCheck();
        },
        error: (error: any) => {
          this.loader.stopLoader();
          this.handleError(error);
        }
      });
  }

  handleCreate(data: any) {
    if (data) {
      const base64Strings: string[] = data.images;

      const base64Images: Base64File[] = base64Strings.map(
        (base64String: string) => ({
          base64: base64String
        })
      )

      const createProperty: CreateProperty = {
        title: data.title,
        location: data.location,
        category: data.category,
        description: data.description,
        developerId: data.developerId,
        expectedRoi: data.expectedRoi,
        totalInvestment: data.totalInvestment,
        status: data.status,
        base64Images: base64Images
      };

      this.loader.startLoader();
      this.propertiesService.createProperty(createProperty).subscribe({
        next: (response) => {
          this.loader.stopLoader();
          this.getAllProperties();
          this.messageService.add({
            severity: 'success',
            summary: "Property Creation",
            detail: response.message,
            key: 'tl',
            life: 10000
          });
        },
        error: (error: Error) => {
          this.messageService.add({
            severity: 'warn',
            summary: "Error creating property",
            detail: error.message,
            key: 'tl',
            life: 10000
          });
          this.loader.stopLoader();
        }
      });
    }
  }

  openPropertyGallery(property: any) {
    if (Number(property.imageUrls.length) > 0) {
      this.selectedPropertyImages = property.imageUrls;
      this.picturesComponent.show();
    }
  }


  triggerSearchInput(value: string) {
    this.searchPropertiesInput = value;
    this.getAllProperties();
  }

  paginate(paginate: any) {
    this.page = paginate.page;
    this.size = paginate.rows;
    this.getAllProperties();
  }

  openFundingRound(property: Property) {
    this.selectedFundingProperty = property;
    this.fundingTargetAmount = property.totalInvestment;
    this.fundingDeadline = '';
    this.showFundingModal = true;
  }

  createFundingRound() {
    if (!this.selectedFundingProperty || this.fundingTargetAmount <= 0) return;

    const deadline = this.fundingDeadline ? this.fundingDeadline + 'T00:00:00' : null;

    this.loader.startLoader();
    this.showFundingModal = false;
    this.propertiesService.createFundingRound(this.selectedFundingProperty.id, this.fundingTargetAmount, deadline)
      .subscribe({
        next: (response) => {
          this.loader.stopLoader();
          this.getAllProperties();
          this.messageService.add({
            severity: 'success',
            summary: 'Funding Round Created',
            detail: response.message,
            key: 'tl',
            life: 5000
          });
        },
        error: (error: Error) => {
          this.loader.stopLoader();
          this.messageService.add({
            severity: 'warn',
            summary: 'Error',
            detail: error.message,
            key: 'tl',
            life: 5000
          });
        }
      });
  }
}
