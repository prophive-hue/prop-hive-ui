import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {InvestorService} from '../../services/investor.service';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {LoaderService} from '../../../shared/service/loader.service';

@Component({
  selector: 'app-onboarding-risk-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxUiLoaderModule],
  templateUrl: './onboarding-risk-profile.component.html',
  styleUrl: './onboarding-risk-profile.component.css'
})
export class OnboardingRiskProfileComponent {

  @Output() nextClicked = new EventEmitter<void>();
  @Output() previousClicked = new EventEmitter<void>();

  riskProfileForm: FormGroup;

  investmentGoals = [
    'Capital Growth',
    'Monthly Income',
    'Wealth Preservation',
    'Tax Efficiency',
    'Portfolio Diversification'
  ];

  constructor(private fb: FormBuilder, private investorService: InvestorService, private loader: LoaderService) {
    this.riskProfileForm = this.fb.group({
      riskAppetite: ['', Validators.required],
      investmentGoals: ['', Validators.required],
      investmentExperience: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getRiskProfile();
  }

  nextStep() {
    this.nextClicked.emit();
  }

  previousStep() {
    this.previousClicked.emit();
  }

  submitRiskProfile(userId: string) {
    this.riskProfileForm.markAllAsTouched();
    if (this.riskProfileForm.valid) {
      this.loader.startLoader();
      const dto = this.riskProfileForm.value;
      this.investorService.saveRiskProfile(userId, dto).subscribe({
        next: () => {
          this.loader.stopLoader();
          this.nextStep()
        },
        error: (err) => {
          console.error('Failed to save risk profile', err)
          this.loader.stopLoader();
        }
      });
    }
  }

  getRiskProfile() {
    this.loader.startLoader();
    this.investorService.getStepDetails('6820d4faa1179f0cb69dd6b3', 4).subscribe({
      next: (data) => {
        if (data) {
          this.riskProfileForm.patchValue({
            riskAppetite: data.riskAppetite,
            investmentGoals: data.investmentGoals,
            investmentExperience: data.investmentExperience
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
