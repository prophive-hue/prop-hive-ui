import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {InvestorService} from '../../services/investor.service';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {LoaderService} from '../../../shared/service/loader.service';

@Component({
  selector: 'app-onboarding-financial-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxUiLoaderModule],
  templateUrl: './onboarding-financial-details.component.html',
  styleUrl: './onboarding-financial-details.component.css'
})
export class OnboardingFinancialDetailsComponent implements OnInit {
  @Output() nextClicked = new EventEmitter<void>();
  @Output() previousClicked = new EventEmitter<void>();

  financialForm!: FormGroup;

  constructor(private fb: FormBuilder, private investorService: InvestorService, private loader: LoaderService) {
  }

  ngOnInit(): void {
    this.financialForm = this.fb.group({
      employmentStatus: ['', Validators.required],
      employerName: [''],
      monthlyIncomeRange: ['', Validators.required],
      affordabilityDeclaration: [false, Validators.requiredTrue]
    });

    this.getBankingDetails()
  }

  submitFinancialDetails(userId: string) {
    this.financialForm.markAllAsTouched();
    if (this.financialForm.valid) {
      this.loader.startLoader();
      const payload = this.financialForm.value;
      this.investorService.saveFinancialDetails(userId, payload).subscribe({
        next: () => {
          this.loader.stopLoader();
          this.nextStep()
        },
        error: err => {
          console.error('Failed to save financial details', err)
          this.loader.stopLoader();
        }
      });
    }
  }

  getBankingDetails() {
    this.loader.startLoader();
    this.investorService.getStepDetails('6820d4faa1179f0cb69dd6b3', 3).subscribe({
      next: (data) => {
        if (data) {
          this.financialForm.patchValue({
            employmentStatus: data.employmentStatus,
            employerName: data.employerName,
            monthlyIncomeRange: data.monthlyIncomeRange,
            affordabilityDeclaration: data.affordabilityDeclaration
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

  nextStep() {
    this.nextClicked.emit();
  }

  previousStep() {
    this.previousClicked.emit();
  }
}
