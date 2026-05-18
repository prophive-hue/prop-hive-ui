import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {HeaderComponent} from "../../shared/components/header/header.component";
import {FooterComponent} from '../../shared/components/footer/footer.component';
import {AdminPropertiesService, Property, PropertyCategory, PropertyStatus} from '../../features/admin/services/admin-properties.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Toast, ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {CurrencyPipe, DecimalPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { SmartComponent } from '../../shared/components/base/base.component';
import { takeUntil } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';
import { WalletService } from '../../features/investor/services/wallet.service';
import type { FundingRound } from '../../models';

@Component({
  selector: 'app-property-detail',
  imports: [
    HeaderComponent,
    FooterComponent,
    DecimalPipe,
    CurrencyPipe,
    RouterLink,
    NgIf,
    FormsModule,
    ToastModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyDetailComponent extends SmartComponent implements OnInit {
  property: Property = {
    id:'',
    title: '',
    location: '',
    category: PropertyCategory.RESIDENTIAL,
    description: '',
    developer: '',
    expectedRoi: 0,
    totalInvestment: 0,
    status: PropertyStatus.NEW_DEVELOPMENT,
    imageUrls: []
  };
  progressPercentage = 0;
  isRequesting = false;
  showInvestModal = false;
  investAmount: number = 0;
  isMobile = false;
  propertyId: any;
  currentImageIndex = 0;
  fundingRound: FundingRound | null = null;
  isLoggedIn = false;
  private userId = '';

  constructor(
    private route: ActivatedRoute,
    private toast: MessageService,
    private admin: AdminPropertiesService,
    private authService: AuthService,
    private walletService: WalletService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id')?.toString();
    this.getProperty(this.propertyId);
    this.loadFundingRound();

    this.isLoggedIn = this.authService.isLoggedIn();
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userId = user.id;
    }
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
    if (this.fundingRound && this.fundingRound.investorsToday > 0) {
      return `${this.fundingRound.investorsToday} investor${this.fundingRound.investorsToday > 1 ? 's' : ''} invested today`;
    }
    return '';
  }

  handleInvestNow(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: `/property-details/${this.propertyId}` } });
      return;
    }
    this.showInvestModal = true;
  }

  confirmInvestment(): void {
    if (this.investAmount <= 0) return;

    this.walletService.invest(this.userId, { propertyId: this.propertyId, amount: this.investAmount })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.showInvestModal = false;
          this.investAmount = 0;
          this.loadFundingRound();
          this.toast.add({
            severity: 'success',
            summary: 'Investment Successful',
            detail: 'Your investment has been processed.',
            key: 'tl',
            life: 5000
          });
        },
        error: (error: any) => {
          this.toast.add({
            severity: 'warn',
            summary: 'Investment Failed',
            detail: error?.message || 'Something went wrong',
            key: 'tl',
            life: 5000
          });
        }
      });
  }

  private loadFundingRound(): void {
    this.walletService.getFundingRound(this.propertyId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (fr) => {
          this.fundingRound = fr;
          this.progressPercentage = fr.percentageFunded;
          this.cdr.markForCheck();
        },
        error: () => {}
      });
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
    this.setLoading(true);
    this.admin.getProperty(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: (response: Property) => {
        this.property = response;
        this.currentImageIndex = 0; // Reset to first image
        this.setLoading(false);
      },
      error: (error: any) => {
        this.handleError(error);
      }
    });
  }

  previousImage() {
    if (this.property.imageUrls.length > 1) {
      this.currentImageIndex = this.currentImageIndex > 0 ? this.currentImageIndex - 1 : this.property.imageUrls.length - 1;
      this.cdr.markForCheck();
    }
  }

  nextImage() {
    if (this.property.imageUrls.length > 1) {
      this.currentImageIndex = this.currentImageIndex < this.property.imageUrls.length - 1 ? this.currentImageIndex + 1 : 0;
      this.cdr.markForCheck();
    }
  }
}
