import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InvestorService} from '../../services/investor.service';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {LoaderService} from '../../../shared/service/loader.service';

@Component({
  selector: 'app-onboarding-banking-details',
  imports: [
    ReactiveFormsModule,
    NgxUiLoaderModule
  ],
  templateUrl: './onboarding-banking-details.component.html',
  styleUrl: './onboarding-banking-details.component.css'
})
export class OnboardingBankingDetailsComponent {

  @Output() nextClicked = new EventEmitter<void>();
  @Output() previousClicked = new EventEmitter<void>();

  bankingForm: FormGroup;
  selectedFileBase64: string | null = null;

  proofOfBankAccountUrl:string = '';

  constructor(private fb: FormBuilder, private investorService: InvestorService, private loader: LoaderService ) {
    this.bankingForm = this.fb.group({
      accountHolderName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      bankName: ['', Validators.required],
      branchCode: ['', Validators.required],
      proofOfBankAccountBase64: ['']
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFileBase64 = reader.result as string;
        this.bankingForm.patchValue({
          proofOfBankAccountBase64: this.selectedFileBase64
        });
      };
      reader.readAsDataURL(file);
    }
  }

  submitBankingDetails(userId: string) {
    this.bankingForm.markAllAsTouched();
    if (this.bankingForm.valid) {

      this.loader.startLoader();
      this.investorService.saveBankingDetails(userId, this.bankingForm.value).subscribe({
        next: () => {
          this.getBankingDetails();
          this.loader.stopLoader();
        },
        error: err => {
          console.error('Failed to save banking details', err);
          this.loader.stopLoader();
        }
      });
    }
  }

  ngOnInit(): void {
    this.getBankingDetails();
  }

  getBankingDetails() {
    this.loader.startLoader();
    this.investorService.getStepDetails('6820d4faa1179f0cb69dd6b3', 2).subscribe({
      next: (data) => {
        if(data) {
          this.bankingForm.patchValue({
            accountHolderName: data.accountHolderName,
            accountNumber: data.accountNumber,
            bankName: data.bankName,
            branchCode: data.branchCode
          });

          this.proofOfBankAccountUrl  = "proofOfBankAccountUrl";
        }

        this.loader.stopLoader();
      },
      error: (err) => {
        console.error('Failed to fetch personal information', err)
        this.loader.stopLoader();
      }
    });
  }


  downloadFileByUrl(url: string) {
    const fileName = url.split('/').pop() || 'download';
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  nextStep() {
    this.nextClicked.emit();
  }


  previousStep() {
    this.previousClicked.emit();
  }
}
