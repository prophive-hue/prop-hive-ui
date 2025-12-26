import {Component, ElementRef, ViewChild, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {FooterComponent} from "../../shared/components/footer/footer.component";
import {HeaderComponent} from "../../shared/components/header/header.component";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {CardPropertyComponent} from '../card-property/card-property.component';
import {AdminPropertiesService, Property} from '../../features/admin/services/admin-properties.service';
import {Pagination} from '../../features/admin/services/admin-properties.service';
import {PaginatedResponse} from '../../models';
import {ConstantsService} from '../../core/services/constants.service';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {LoaderService} from '../../core/services/loader.service';
import {SmartComponent} from '../../shared/components/base/base.component';
import {takeUntil} from 'rxjs';

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
  styleUrl: './home-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeLayoutComponent extends SmartComponent implements OnInit {

  constructor(private propertiesService: AdminPropertiesService, private constants: ConstantsService, private loader:LoaderService) {
    super();
  }


  investmentTypes: string[] = [];

  propertyCompletionTypes: string[] = [];

  propertyTypes: string[] = [];

  propertyValues: string[] = [];

  managementTypes: string[] = [];

  imagePath = '/building-1.jpg';


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
    this.setLoading(true);

    const paginator: Pagination = {
      page: 0,
      size: 15
    }
    this.propertiesService.getAllHomeProperties(paginator)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: (response: PaginatedResponse<Property>) => {
        this.properties = response.content;
        this.setLoading(false);
      },
      error: (error: Error) => {
        this.handleError(error);
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
