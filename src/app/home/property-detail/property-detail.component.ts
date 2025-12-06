import { Component } from '@angular/core';
import {HeaderComponent} from "../../shared/header/header.component";
import {FooterComponent} from '../../shared/footer/footer.component';
import {AdminPropertiesService, Property} from '../../admin/services/admin-properties.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Toast, ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {DecimalPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-property-detail',
  imports: [
    HeaderComponent,
    FooterComponent,
    DecimalPipe,
    RouterLink,
    NgIf,
    NgOptimizedImage
  ],
  providers: [
    MessageService
  ],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent {
  property: Property = {
    id:'',
    title: '',
    location: '',
    category: '',
    description: '',
    developer: '',
    expectedRoi: 0,
    totalInvestment: 0,
    status: '',
    imageUrls: []
  };
  progressPercentage = 0;
  isRequesting = false;
  showInvestmentSteps = false;
  isMobile = false;
  propertyId: any;

  constructor(
    private route: ActivatedRoute,
    private toast: MessageService,
    private admin: AdminPropertiesService
  ) {}

  ngOnInit(): void {

    this.propertyId = this.route.snapshot.paramMap.get('id')?.toString();

    this.getProperty(this.propertyId);

  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  }

  getInvestButtonText(): string {
    if (this.progressPercentage > 95) return 'Final Opportunity';
    if (this.progressPercentage > 80) return 'Limited Spots Remaining';
    return 'Invest Now';
  }

  getUrgencyText(): string {
    const todayInvestors = Math.floor(Math.random() * 8) + 3;
    return `${todayInvestors} investors joined today`;
  }

  handleInvestNow(): void {
    this.showInvestmentSteps = true;
  }

  handleRequestInfo(): void {
    this.isRequesting = true;


    this.toast.add({
      severity: 'warn',
      summary: "Information Request Sent",
      detail: `We will send more information about ${this.property?.title} shortly.`,
      key: 'tl',
      life: 10000
    });

  }

  handleBankSelection(bank: string): void {

    this.toast.add({
      severity: 'warn',
      summary: `${bank} Financing`,
      detail: `We'll connect you with ${bank} to discuss financing options.`,
      key: 'tl',
      life: 10000
    });
  }

  getProperty(id:string){
    this.admin.getProperty(id).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.property = response;
        //this.loading = false;
        // Navigate to dashboard or home page after login
        // this.router.navigate(['/dashboard']);
      },
      error: (error: Error) => {
        // this.errorMessage = error.message;
        //this.loading = false;
      }
    });
  }
}
