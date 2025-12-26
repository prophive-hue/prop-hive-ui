import {Component, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {Button} from 'primeng/button';
import {ProgressBar} from 'primeng/progressbar';
import {Tag} from 'primeng/tag';
import {Toast} from 'primeng/toast';
import {Toolbar} from 'primeng/toolbar';
import {SlicePipe} from '@angular/common';
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
import { SmartComponent } from '../../../shared/components/base/base.component';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { TrackByFunctions } from '../../../shared/utils/track-by.functions';

@Component({
  selector: 'app-properties',
  imports: [
    DialogPropertyCreateComponent,
    GalleryComponent,
    Toast,
    ProgressBar,
    Tag,
    SlicePipe,
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

      case 'New Developmentt':
        return 'info';

      case 'Under Construction':
        return 'warn';

      case 'renewal':
        return null;
    }


    return ''
  }

  getAllProperties() {
    const paginator: AdminPropertiesPagination = {
      propertyName: this.searchPropertiesInput,
      page: this.page,
      size: this.size
    }

    this.setLoading(true);
    this.propertiesService.getAllProperties(paginator)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.properties = response.content;
          this.totalElements = response.totalElements;
          this.setLoading(false);
        },
        error: (error: any) => {
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
        developer: data.developer,
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


}
