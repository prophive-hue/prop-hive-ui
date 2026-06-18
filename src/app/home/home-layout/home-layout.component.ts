import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FooterComponent} from "../../shared/components/footer/footer.component";
import {HeaderComponent} from "../../shared/components/header/header.component";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FormsModule} from '@angular/forms';
import {SmartComponent} from '../../shared/components/base/base.component';
import {takeUntil} from 'rxjs';
import {BaseHttpService} from '../../core/api/base/base-http.service';
import {Injectable, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {PropertyListComponent} from '../../shared/components/property-list/property-list.component';

@Injectable({providedIn: 'root'})
class InquiryRepository extends BaseHttpService {
  submitDeveloperInquiry(data: any): Observable<{ message: string }> {
    return this.post<{ message: string }>('/inquiry/developer', data);
  }
}

@Component({
  selector: 'app-home-layout',
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterLink,
    FormsModule,
    NgOptimizedImage,
    PropertyListComponent
  ],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeLayoutComponent extends SmartComponent {

  inquiryName = '';
  inquiryEmail = '';
  inquiryPhone = '';
  inquiryCompany = '';
  inquiryMessage = '';
  inquirySubmitting = false;
  inquirySuccess = '';

  private inquiryRepo = inject(InquiryRepository);

  submitInquiry() {
    this.inquirySubmitting = true;
    this.inquirySuccess = '';
    this.inquiryRepo.submitDeveloperInquiry({
      name: this.inquiryName,
      email: this.inquiryEmail,
      phone: this.inquiryPhone,
      companyName: this.inquiryCompany,
      message: this.inquiryMessage
    }).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.inquirySubmitting = false;
        this.inquirySuccess = res.message;
        this.inquiryName = '';
        this.inquiryEmail = '';
        this.inquiryPhone = '';
        this.inquiryCompany = '';
        this.inquiryMessage = '';
        this.cdr.markForCheck();
      },
      error: () => {
        this.inquirySubmitting = false;
        this.cdr.markForCheck();
      }
    });
  }
}
