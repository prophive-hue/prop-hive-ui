import {Component} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {StepperModule} from 'primeng/stepper';
import {OnboardingPersonalInfoComponent} from '../onboarding-personal-info/onboarding-personal-info.component';
import {
  OnboardingIdentityVerificationComponent
} from '../onboarding-identity-verification/onboarding-identity-verification.component';
import {OnboardingBankingDetailsComponent} from '../onboarding-banking-details/onboarding-banking-details.component';
import {
  OnboardingFinancialDetailsComponent
} from '../onboarding-financial-details/onboarding-financial-details.component';
import {OnboardingRiskProfileComponent} from '../onboarding-risk-profile/onboarding-risk-profile.component';
import {OnboardingLegalAgreementsComponent} from '../onboarding-legal-agreements/onboarding-legal-agreements.component';
import {OnboardingKycAmlComponent} from '../onboarding-kyc-aml/onboarding-kyc-aml.component';
import {OnboardingCreditCheckComponent} from '../onboarding-credit-check/onboarding-credit-check.component';
import {NgClass, NgForOf, NgSwitch, NgSwitchCase} from '@angular/common';

@Component({
  selector: 'app-onboarding-layout',
  imports: [ButtonModule, StepperModule,
    OnboardingPersonalInfoComponent,
    OnboardingIdentityVerificationComponent,
    OnboardingBankingDetailsComponent,
    OnboardingFinancialDetailsComponent,
    OnboardingRiskProfileComponent,
    OnboardingLegalAgreementsComponent,
    OnboardingKycAmlComponent,
    OnboardingCreditCheckComponent,
    NgSwitch, NgSwitchCase, NgClass, NgForOf,
  ],
  templateUrl: './onboarding-layout.component.html',
  styleUrl: './onboarding-layout.component.css'
})
export class OnboardingLayoutComponent {

  stepLabels: string[]= [
    "Personal Information",
    "Identity Verification",
    "Banking Details",
    "Financial Details",
    "Risk Profile",
    "Legal Agreements",
    "KYC & AML",
    "Credit Check (Optional"
  ];


  currentStep: number = 0;

  goToStep(index: number) {
    this.currentStep = index;
  }

  onNextFromChild(index:number) {
    this.currentStep = index + 1;
  }

  onPreviousFromChild(index:number) {
    this.currentStep = index - 1;
  }
}
