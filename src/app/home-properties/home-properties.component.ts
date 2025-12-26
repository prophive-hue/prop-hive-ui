import {Component, ElementRef, ViewChild, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FooterComponent} from '../shared/components/footer/footer.component';
import {HeaderComponent} from '../shared/components/header/header.component';
import {NgForOf} from '@angular/common';
import {CardPropertyComponent} from '../home/card-property/card-property.component';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {AdminPropertiesService, Pagination, Property} from '../features/admin/services/admin-properties.service';
import {ConstantsService} from '../core/services/constants.service';
import {LoaderService} from '../core/services/loader.service';
import { SmartComponent } from '../shared/components/base/base.component';
import { takeUntil } from 'rxjs';
import { TrackByFunctions } from '../shared/utils/track-by.functions';

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
  styleUrl: './home-properties.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePropertiesComponent extends SmartComponent implements OnInit {
  trackById = TrackByFunctions.trackById;
  trackByTitle = TrackByFunctions.trackByTitle;
  constructor(private propertiesService: AdminPropertiesService, private constants: ConstantsService, private loader:LoaderService) {
    super();
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
    this.setLoading(true);

    const paginator: Pagination = {
      page: 0,
      size: 15
    }
    this.propertiesService.getAllHomeProperties(paginator)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.properties = response.content;
          this.setLoading(false);
        },
        error: (error: any) => {
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
