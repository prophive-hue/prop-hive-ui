import {Component, ElementRef, ViewChild} from '@angular/core';
import {FooterComponent} from "../../shared/footer/footer.component";
import {HeaderComponent} from "../../shared/header/header.component";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {CardPropertyComponent} from '../card-property/card-property.component';
import {AdminPropertiesService, Property} from '../../admin/services/admin-properties.service';
import {Pagination} from '../../admin/services/admin-properties.service';
import {ConstantsService} from '../../shared/service/constants.service';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {LoaderService} from '../../shared/service/loader.service';

@Component({
  selector: 'app-home-layout',
  imports: [
    FooterComponent,
    HeaderComponent,
    NgForOf,
    RouterLink,
    CardPropertyComponent,
    NgxUiLoaderModule,
    NgOptimizedImage
  ],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent {

  constructor(private propertiesService: AdminPropertiesService, private constants: ConstantsService, private loader:LoaderService) {
  }


  investmentTypes: string[] = [];

  propertyCompletionTypes: string[] = [];

  propertyTypes: string[] = [];

  propertyValues: string[] = [];

  managementTypes: string[] = [];

  imagePath = '../public/building-1.jpg';


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
