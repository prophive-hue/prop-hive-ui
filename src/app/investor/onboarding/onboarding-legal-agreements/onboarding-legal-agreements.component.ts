import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {CommonModule} from '@angular/common';
import {InvestorService} from '../../services/investor.service';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {LoaderService} from '../../../shared/service/loader.service';

@Component({
  selector: 'app-onboarding-legal-agreements',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    PanelModule,
    NgxUiLoaderModule
  ],
  templateUrl: './onboarding-legal-agreements.component.html',
  styleUrl: './onboarding-legal-agreements.component.css'
})
export class OnboardingLegalAgreementsComponent {

  @Output() nextClicked = new EventEmitter<void>();
  @Output() previousClicked = new EventEmitter<void>();

  legalAgreementsForm: FormGroup;

  constructor(private fb: FormBuilder, private investorService: InvestorService, private loader: LoaderService) {
    this.legalAgreementsForm = this.fb.group({
      termsAndConditionsAgreed: [false, Validators.requiredTrue],
      privacyPolicyAgreed: [false, Validators.requiredTrue],
      riskDisclosureAgreed: [false, Validators.requiredTrue],
      investorSubscriptionAgreed: [false, Validators.requiredTrue],
    });
  }

  ngOnInit(){
    this.getBankingDetails();
  }


  termsConditions = false;
  privacyPolicy = false;
  investorRiskDisclosureStatement = false;
  investorSubscriptionAgreement = false;

  openAgreementDocument(number: number) {
    switch (number) {
      case 1:
        this.termsConditions = true;
        break;
      case 2:
        this.privacyPolicy = true;
        break;
      case 3:
        this.investorRiskDisclosureStatement = true;
        break;
      case 4:
        this.investorSubscriptionAgreement = true;
        break;
    }
  }


  nextStep() {
    this.nextClicked.emit();
  }

  previousStep() {
    this.previousClicked.emit();
  }

  submitLegalAgreements(userId: string) {
    this.legalAgreementsForm.markAllAsTouched();
    if (this.legalAgreementsForm.valid) {
      this.loader.startLoader();
      const dto = this.legalAgreementsForm.value;
      this.investorService.saveLegalAgreements(userId,dto).subscribe({
        next: () => {
          this.loader.stopLoader();
          this.nextClicked.emit();
        },
        error: err => {
          console.error('Failed to save legal agreements', err)
          this.loader.stopLoader();
        }
      });
    }
  }

 getBankingDetails() {
    this.loader.startLoader();
    this.investorService.getStepDetails('6820d4faa1179f0cb69dd6b3', 5).subscribe({
      next: (data) => {
        if(data) {
          this.legalAgreementsForm.patchValue({
            termsAndConditionsAgreed: data.termsAndConditionsAgreed,
            privacyPolicyAgreed: data.privacyPolicyAgreed,
            riskDisclosureAgreed: data.riskDisclosureAgreed,
            investorSubscriptionAgreed: data.investorSubscriptionAgreed
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
