import { Component, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { Button } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DecimalPipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { SmartComponent } from '../../../shared/components/base/base.component';
import { DeveloperService } from '../services/developer.service';
import { AuthService } from '../../auth/services/auth.service';
import { LoaderService } from '../../../core/services/loader.service';
import { DialogPropertyCreateComponent } from '../../admin/dialog/dialog-property-create/dialog-property-create.component';
import { takeUntil } from 'rxjs';
import type { DeveloperProperty } from '../../../core/api/repositories/developer.repository';
import type { SubmitPropertyRequest } from '../../../core/api/repositories/developer.repository';

@Component({
  selector: 'app-developer-properties',
  imports: [CardModule, TagModule, Button, ToolbarModule, ToastModule, DecimalPipe, NgxUiLoaderModule, DialogPropertyCreateComponent],
  providers: [MessageService],
  templateUrl: './developer-properties.component.html',
  styleUrl: './developer-properties.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeveloperPropertiesComponent extends SmartComponent implements OnInit {

  @ViewChild('dialog') dialogComponent!: DialogPropertyCreateComponent;

  properties: DeveloperProperty[] = [];
  private userId: string = '';

  constructor(
    private developerService: DeveloperService,
    private authService: AuthService,
    private messageService: MessageService,
    private loader: LoaderService
  ) {
    super();
  }

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userId = user.id;
      this.loadProperties();
    }
  }

  private loadProperties() {
    this.setLoading(true);
    this.developerService.getMyProperties(this.userId, { page: 0, size: 50 })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.properties = response.content;
          this.setLoading(false);
        },
        error: (error) => this.handleError(error)
      });
  }

  handleCreate(data: any) {
    if (!data) return;

    const request: SubmitPropertyRequest = {
      title: data.title,
      location: data.location,
      category: data.category,
      description: data.description,
      expectedRoi: data.expectedRoi,
      totalInvestment: data.totalInvestment,
      status: data.status,
      base64Images: data.images?.map((base64: string) => ({ base64 })) || []
    };

    this.loader.startLoader();
    this.developerService.submitProperty(this.userId, request)
      .subscribe({
        next: (response) => {
          this.loader.stopLoader();
          this.loadProperties();
          this.messageService.add({
            severity: 'success',
            summary: 'Property Submitted',
            detail: response.message,
            key: 'tl',
            life: 10000
          });
        },
        error: (error: Error) => {
          this.loader.stopLoader();
          this.messageService.add({
            severity: 'warn',
            summary: 'Error',
            detail: error.message,
            key: 'tl',
            life: 10000
          });
        }
      });
  }

  getSeverity(status: string): string {
    switch (status) {
      case 'APPROVED': return 'success';
      case 'PENDING_REVIEW': return 'warn';
      case 'REJECTED': return 'danger';
      default: return 'info';
    }
  }
}
