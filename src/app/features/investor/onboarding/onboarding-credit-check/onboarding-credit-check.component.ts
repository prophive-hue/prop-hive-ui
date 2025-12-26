import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {InvestorService} from '../../services/investor.service';
import {SkeletonModule} from 'primeng/skeleton';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {LoaderService} from '../../../shared/service/loader.service';

@Component({
  selector: 'app-onboarding-credit-check',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SkeletonModule, NgxUiLoaderModule],
  templateUrl: './onboarding-credit-check.component.html',
  styleUrl: './onboarding-credit-check.component.css'
})
export class OnboardingCreditCheckComponent {

  @Output() previousClicked = new EventEmitter<void>();
  @Output() nextClicked = new EventEmitter<void>();

  creditCheckForm: FormGroup;

  constructor(private fb: FormBuilder, private investorService: InvestorService, private loader: LoaderService) {
    this.creditCheckForm = this.fb.group({
      creditCheckConsentAgreed: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {
    this.getCreditCheck();
  }


  previousStep() {
    this.previousClicked.emit();
  }

  submitCreditCheck(userId: string) {
    if (this.creditCheckForm.valid) {
      this.loader.stopLoader()
      const dto = this.creditCheckForm.value;
      this.investorService.saveCreditCheck(userId, dto).subscribe({
        next: () => {
          this.loader.stopLoader();
          this.nextClicked.emit()
        },
        error: err => {
          console.error('Failed to save credit check data', err)
          this.loader.stopLoader();
        }
      });
    }
  }

  getCreditCheck() {
    this.loader.startLoader();
    this.investorService.getStepDetails('6820d4faa1179f0cb69dd6b3', 7).subscribe({
      next: (data) => {
        if (data) {
          this.creditCheckForm.patchValue({
            creditCheckConsentAgreed: data.creditCheckConsentAgreed,
          });
        }
        this.loader.stopLoader();
      },
      error: (err) => {
        console.error('Failed to fetch personal information', err)
        this.loader.stopLoader();
      }
    });
  }
}
