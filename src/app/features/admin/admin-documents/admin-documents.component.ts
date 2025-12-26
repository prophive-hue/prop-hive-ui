import {Component, ViewChild} from '@angular/core';
import {
  DialogAdminDocumentUploadComponent
} from '../dialog/dialog-admin-document-upload/dialog-admin-document-upload.component';
import {MessageService} from 'primeng/api';
import {AdminDocumentsService, DocumentPagination} from '../services/admin-documents.service';
import {Button} from 'primeng/button';
import {Toolbar} from 'primeng/toolbar';
import {Toast} from 'primeng/toast';
import {DatePipe} from '@angular/common';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {Paginator} from 'primeng/paginator';
import {SearchButtonComponent} from '../../../shared/components/search-button/search-button.component';
import {PaginatorComponent} from '../../../shared/components/paginator/paginator.component';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {LoaderService} from '../../../core/services/loader.service';

@Component({
  selector: 'app-admin-documents',
  imports: [
    DialogAdminDocumentUploadComponent,
    Button,
    Toolbar,
    Toast,
    DatePipe,
    FormsModule,
    SearchButtonComponent,
    PaginatorComponent,
    NgxUiLoaderModule
  ],
  providers: [
    MessageService,
  ],
  templateUrl: './admin-documents.component.html',
  styleUrl: './admin-documents.component.css'
})
export class AdminDocumentsComponent {
  @ViewChild('dialog') dialogComponent!: DialogAdminDocumentUploadComponent;

  documents: any[] = [];

  totalElements: number = 0;
  page: number = 0;
  size: number = 5;

  searchDocumentName: string = '';

  searchDocumentCategory: string = '';

  searchTimeout: any

  constructor(private documentsService: AdminDocumentsService, private messageService: MessageService, private loader:LoaderService) {
  }

  ngOnInit() {
    this.getAllDocuments();
  }

  getAllDocuments() {
    const paginator: DocumentPagination = {
      page: this.page,
      size: this.size,
      documentName: this.searchDocumentName,
      category: this.searchDocumentCategory
    }

    console.log("paginator: " + paginator.size);

    this.loader.startLoader();

    this.documentsService.getAllDDocuments(paginator).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.documents = response.content;
        this.totalElements = response.totalElements;
        this.loader.stopLoader();
      },
      error: (error: Error) => {
        this.loader.stopLoader();
      }
    });
  }

  handleCreate(data: any) {
    if (data) {
      console.log('Resource created:', data);
      // TODO: Persist data to a service or backend


      this.loader.startLoader();
      this.documentsService.createDocument(data).subscribe({
        next: (response) => {
          console.log('deduction created successfully', response);
          this.loader.stopLoader();
          this.getAllDocuments();
          this.messageService.add({
            severity: 'success',
            summary: "Document Creation",
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
            summary: "Error creating document",
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

  deleteDocument(id: string) {
    this.loader.startLoader();
    this.documentsService.deleteDocument(id).subscribe({
      next: (response) => {
        console.log('document deleted successfully', response);
        this.loader.stopLoader();
        this.getAllDocuments();
        // Navigate to dashboard or home page after login
        // this.router.navigate(['/dashboard']);
      },
      error: (error: Error) => {
        // this.errorMessage = error.message;
        this.loader.stopLoader();
      }
    });
  }

  async downloadWithUrl(fileUrl: string) {
    window.open(fileUrl, '_blank');
  }


  searchCategory(category: string) {
    this.searchDocumentCategory = category;
    this.resetPagination();
    this.getAllDocuments();
  }

  resetPagination() {
    this.page = 0;
    this.size = 5;
  }


  triggerSearchInput(value: string) {
    this.searchDocumentName = value;
    this.resetPagination()
    this.getAllDocuments();
  }

  paginate(paginate: any) {
    this.page = paginate.page;
    this.size = paginate.rows;
    this.getAllDocuments();
  }
}
