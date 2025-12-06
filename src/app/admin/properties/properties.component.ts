import {Component, OnInit, ViewChild} from '@angular/core';
import {Button} from 'primeng/button';
import {ProgressBar} from 'primeng/progressbar';
import {Paginator,} from 'primeng/paginator';

import {Tag} from 'primeng/tag';
import {Toast} from 'primeng/toast';
import {Toolbar} from 'primeng/toolbar';

import {CustomerService} from '../services/customer.service';
import {DialogPropertyCreateComponent} from '../dialog/dialog-property-create/dialog-property-create.component';
import {
  AdminPropertiesPagination,
  AdminPropertiesService,
  Base64File,
  CreateProperty,
  Pagination,
  Property
} from '../services/admin-properties.service';
import {MessageService} from 'primeng/api';
import {GalleryComponent} from '../../shared/gallery/gallery.component';
import {SlicePipe} from '@angular/common';
import {SearchButtonComponent} from '../../shared/search-button/search-button.component';
import {PaginatorComponent} from '../../shared/paginator/paginator.component';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {LoaderService} from '../../shared/service/loader.service';

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
  providers: [CustomerService, AdminPropertiesService, MessageService]
})
export class PropertiesComponent implements OnInit {


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

    console.log("paginator: " + paginator.size);

    this.loader.startLoader();
    this.propertiesService.getAllProperties(paginator).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.properties = response.content;
        this.totalElements = response.totalElements;
        this.loader.stopLoader();
        // Navigate to dashboard or home page after login
        // this.router.navigate(['/dashboard']);
      },
      error: (error: Error) => {
        // this.errorMessage = error.message;
        this.loader.stopLoader();
      }
    });
  }

  handleCreate(data: any) {
    if (data) {
      console.log('Resource created:', data);
      // TODO: Persist data to a service or backend

      const base64Strings: string[] = data.images;

      const base64Images: Base64File[] = base64Strings.map(
        (base64String: string) => {
          const newBase64: Base64File = {
            base64: base64String
          }
          return newBase64
        }
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
          console.log('Login successful', response);
          this.loader.stopLoader();
          this.getAllProperties();
          this.messageService.add({
            severity: 'success',
            summary: "Property Creation",
            detail: response.message,
            key: 'tl',
            life: 10000
          });
          // Navigate to dashboard or home page after login
          // this.router.navigate(['/dashboard']);
        },
        error: (error: Error) => {
          this.messageService.add({
            severity: 'warn',
            summary: "Error creating property",
            detail: error.message,
            key: 'tl',
            life: 10000
          });
          // this.errorMessage = error.message;
          this.loader.stopLoader();
        }
      });
    }
  }

  openPropertyGallery(property: any) {
    console.log("showing pics: " + property.title);
    console.log("showing pics: " + property.imageUrls.length);


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
