import {Component, ElementRef, ViewChild} from '@angular/core';
import {FooterComponent} from '../shared/footer/footer.component';
import {HeaderComponent} from '../shared/header/header.component';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {CardPropertyComponent} from '../home/card-property/card-property.component';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {AdminPropertiesService, Pagination, Property} from '../admin/services/admin-properties.service';
import {ConstantsService} from '../shared/service/constants.service';
import {LoaderService} from '../shared/service/loader.service';

@Component({
  selector: 'app-home-properties',
  imports: [
    FooterComponent,
    HeaderComponent,
    NgForOf,
    CardPropertyComponent,
    NgxUiLoaderModule
  ],
  templateUrl: './home-properties.component.html',
  styleUrl: './home-properties.component.css'
})
export class HomePropertiesComponent {
  constructor(private propertiesService: AdminPropertiesService, private constants: ConstantsService, private loader:LoaderService) {
  }


  investmentTypes: string[] = [];

  propertyCompletionTypes: string[] = [];

  propertyTypes: string[] = [];

  propertyValues: string[] = [];

  managementTypes: string[] = [];


  ngOnInit() {


    this.investmentTypes = this.constants.investmentTypes();
    this.propertyCompletionTypes = this.constants.propertyCompletionTypes();
    this.propertyTypes = this.constants.propertyTypes();
    this.propertyValues = this.constants.propertyValues();
    this.managementTypes = this.constants.propertyManagementTypes();

    this.getProperties();

  }


  @ViewChild('scrollContainer', {static: false}) scrollContainer!: ElementRef;

  features = [
    {
      title: 'Residential',
      icon: 'bi bi-house'
    },
    {
      title: 'Commercial',
      icon: 'bi bi-building'
    },
    {
      title: 'Hospitality',
      icon: 'bi bi-building'
    },
    {
      title: 'Mixed-Use',
      icon: 'bi bi-buildings'
    },
    {
      title: 'Student Accommodation',
      icon: 'bi bi-buildings'
    }
  ];


  properties: Property[] = [];

  getProperties(){

    this.loader.startLoader();

    const paginator: Pagination = {
      page: 0,
      size: 15
    }
    this.propertiesService.getAllHomeProperties(paginator).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.properties = response.content;
        this.loader.stopLoader();
      },
      error: (error: Error) => {
        this.loader.stopLoader();
      }
    });

  }
  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({left: -200, behavior: 'smooth'});
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({left: 200, behavior: 'smooth'});
  }

}
