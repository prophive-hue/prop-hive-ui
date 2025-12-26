import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {InvestorService} from '../../services/investor.service';
import {ConstantsService} from '../../../shared/service/constants.service';
import {LoaderService} from '../../../shared/service/loader.service';
import {NgxUiLoaderModule} from 'ngx-ui-loader';

@Component({
  selector: 'app-onboarding-personal-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxUiLoaderModule
  ],
  providers: [
    InvestorService,
    ConstantsService
  ],
  templateUrl: './onboarding-personal-info.component.html',
  styleUrls: ['./onboarding-personal-info.component.css']
})
export class OnboardingPersonalInfoComponent {
  @Output() nextClicked = new EventEmitter<void>();

  form: FormGroup;

  nationalities: string[] = [];

  genders: string[] = [];

  constructor(private fb: FormBuilder, private investorService: InvestorService, private constantsService: ConstantsService, private loader: LoaderService) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      residentialAddress: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
    });

    this.nationalities = constantsService.nationalities();

    this.genders = constantsService.genders();


  }

  ngOnInit(): void {
    this.getPersonalInformation();
  }

  getPersonalInformation() {
    this.loader.startLoader();
    this.investorService.getStepDetails('6820d4faa1179f0cb69dd6b3', 0).subscribe({
      next: (data) => {
        if (data) {
          this.form.patchValue({
            fullName: data.fullName,
            dateOfBirth: data.dateOfBirth.split('T')[0],
            gender: this.toTitleCase(data.gender),
            nationality: this.toTitleCase(data.nationality),
            residentialAddress: data.residentialAddress,
            email: data.email,
            mobile: data.mobile,
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

  toTitleCase(text: string): string {
    return text
      .toLowerCase()
      .split(/[_\s]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  nextStep() {
    if (this.form.valid) {
      this.nextClicked.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }

  savePersonalInformation() {
    if (this.form.invalid) return;

    const userId = '6820d4faa1179f0cb69dd6b3';
    const dto = this.form.value;

    dto.dateOfBirth = this.form.value.dateOfBirth + 'T00:00:00';

    this.loader.startLoader();
    this.investorService.savePersonalInformation(userId, dto).subscribe({
      next: () => {
        this.getPersonalInformation()
        this.loader.stopLoader();
      },
      error: (err) => {
        console.error('Save failed', err)
        this.loader.stopLoader();
      }
    });
  }
}
