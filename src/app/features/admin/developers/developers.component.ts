import {Component, ViewChild, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Button} from 'primeng/button';
import {ProgressBarModule} from 'primeng/progressbar';
import {TabsModule} from 'primeng/tabs';
import {PaginatorModule} from 'primeng/paginator';
import {TagModule} from 'primeng/tag';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {DialogDeveloperCreateComponent} from '../dialog/dialog-developer-create/dialog-developer-create.component';
import {AdminDevelopersService, CreateDeveloper, Developer, DeveloperPagination} from '../services/admin-developers.service';
import {RegisterRequest} from '../../auth/services/auth.service';
import {SearchButtonComponent} from '../../../shared/components/search-button/search-button.component';
import {SlicePipe} from '@angular/common';
import {PaginatorComponent} from '../../../shared/components/paginator/paginator.component';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {LoaderService} from '../../../core/services/loader.service';
import { SmartComponent } from '../../../shared/components/base/base.component';
import { takeUntil } from 'rxjs';
import { TrackByFunctions } from '../../../shared/utils/track-by.functions';

@Component({
  selector: 'app-developers',
  imports: [
    TabsModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
    TagModule,
    ToastModule,
    ToolbarModule,
    ProgressBarModule,
    DialogDeveloperCreateComponent,
    SearchButtonComponent,
    Button,
    SlicePipe,
    PaginatorComponent,
    NgxUiLoaderModule
  ],
  providers: [MessageService],
  templateUrl: './developers.component.html',
  styleUrl: './developers.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevelopersComponent extends SmartComponent implements OnInit {

  trackById = TrackByFunctions.trackById;


  @ViewChild('dialog') dialogComponent!: DialogDeveloperCreateComponent;


  statuses!: any[];

  developers: Developer[] = [];

  totalElements: number = 0;
  page: number = 0;
  size: number = 5;

  searchDeveloperInput: string='';


  constructor(private developersService: AdminDevelopersService, private messageService: MessageService, private loader: LoaderService) {
    super();
  }

  ngOnInit() {
    this.getAllDevelopers();
  }



  getSeverity(status: string) {
    switch (status) {
      case 'Property Developer':
        return 'success';

      case 'Construction Company':
        return 'info';

      case 'Real Estate Agency':
        return 'warn';

      case 'Architecture Firm':
        return null;
    }


    return ''
  }

  getAllDevelopers() {
    const paginator: DeveloperPagination = {
      companyName: this.searchDeveloperInput,
      page: this.page,
      size: this.size
    }

    this.setLoading(true);
    this.developersService.getAllDevelopers(paginator)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.developers = response.content;
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
      console.log('Resource created:', data);
      // TODO: Persist data to a service or backend
      const createUser: RegisterRequest = {
        email: data.userEmail,
        password: data.password,
        name: data.userFirstName,
        surname: data.userSurname,
        phone: data.userPhone
      }


      const createDeveloper: CreateDeveloper = {
        companyName: data.companyName,
        email: data.companyEmail,
        phone: data.companyPhone,
        developerType: data.companyType,
        yearsExperience: data.yearsExperience,
        companyDescription: data.description,
        contactPerson: createUser
      };

      this.loader.startLoader();
      this.developersService.createDeveloper(createDeveloper).subscribe({
        next: (response) => {
          console.log('developer created successfully', response);
          this.loader.stopLoader();
          this.getAllDevelopers();
          this.messageService.add({
            severity: 'success',
            summary: "Developer Creation",
            detail: response.message,
            key: 'tl',
            life: 10000
          });
          //Navigate to dashboard or home page after login
          //this.router.navigate(['/dashboard']);
        },
        error: (error: Error) => {
          this.messageService.add({
            severity: 'warn',
            summary: "Error creating developer",
            detail: error.message,
            key: 'tl',
            life: 10000
          });
          //this.errorMessage = error.message;
          this.loader.stopLoader();
        }
      });
    }
  }


  resetPagination() {
    this.page = 0;
    this.size = 5;
  }

  triggerSearchInput(value: string) {
    this.searchDeveloperInput = value;

    this.resetPagination();
    this.getAllDevelopers();
  }

  paginate(paginate: any) {
    this.page = paginate.page;
    this.size = paginate.rows;
    this.getAllDevelopers();
  }

}
