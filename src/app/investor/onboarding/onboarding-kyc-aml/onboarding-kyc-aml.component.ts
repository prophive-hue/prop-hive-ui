import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {InvestorService} from '../../services/investor.service';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {LoaderService} from '../../../shared/service/loader.service';

@Component({
  selector: 'app-onboarding-kyc-aml',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxUiLoaderModule],
  templateUrl: './onboarding-kyc-aml.component.html',
  styleUrl: './onboarding-kyc-aml.component.css'
})
export class OnboardingKycAmlComponent {

  @Output() nextClicked = new EventEmitter<void>();
  @Output() previousClicked = new EventEmitter<void>();

  kycAmlForm: FormGroup;

  constructor(private fb: FormBuilder, private investorService: InvestorService,private loader: LoaderService) {
    this.kycAmlForm = this.fb.group({
      termsAndConditionsAgreed: [false, Validators.requiredTrue],
      sourceOfWealth: ['', Validators.required]
    });
  }


  ngOnInit() {
    this.getKycAml();
  }

  nextStep() {
    this.nextClicked.emit();
  }

  previousStep() {
    this.previousClicked.emit();
  }

  submitKycAml(userId: string) {
    this.kycAmlForm.markAllAsTouched();
    if (this.kycAmlForm.valid) {
      this.loader.startLoader();
      const dto = this.kycAmlForm.value;
      this.investorService.saveKycAml(userId,dto).subscribe({
        next: () => {
          this.loader.stopLoader();
          this.nextClicked.emit()
        },
        error: err => {
          console.error('Failed to save KYC AML data', err)
          this.loader.stopLoader();
        }
      });
    }
  }


  getKycAml(){
    this.loader.startLoader();
    this.investorService.getStepDetails('6820d4faa1179f0cb69dd6b3', 6).subscribe({
      next: (data) => {
        if(data) {
          this.kycAmlForm.patchValue({
            sourceOfWealth: data.sourceOfWealth,
            termsAndConditionsAgreed: data.termsAndConditionsAgreed,
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
