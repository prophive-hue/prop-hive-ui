import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InvestorService} from '../../services/investor.service';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {LoaderService} from '../../../../core/services/loader.service';

@Component({
  selector: 'app-onboarding-identity-verification',
  standalone: true,
  templateUrl: './onboarding-identity-verification.component.html',
  imports: [
    FormsModule,
    NgxUiLoaderModule
  ],
  styleUrls: ['./onboarding-identity-verification.component.css']
})
export class OnboardingIdentityVerificationComponent {
  @Output() nextClicked = new EventEmitter<void>();
  @Output() previousClicked = new EventEmitter<void>();

  idDocumentBase64: string | null = null;
  proofOfAddressBase64: string | null = null;
  taxNumber: string = '';

  idDocumentUrl: string = '';
  proofOfAddressUrl: string = ''


  constructor(private investorService: InvestorService, private loader: LoaderService) {
  }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(){

    this.loader.startLoader();
    this.investorService.getStepDetails('6820d4faa1179f0cb69dd6b3', 1).subscribe({
      next: (data) => {
        if (data) {
          this.idDocumentUrl = data.identityDocumentUrl;
          this.proofOfAddressUrl = data.proofOfAddressUrl;
          this.taxNumber = data.taxIdentificationNumber;
        }

        this.loader.stopLoader();
      },
      error: (err) => {
        console.error('Failed to fetch personal information', err)
        this.loader.stopLoader();
      }
    });
  }

  saveIdentityVerification() {
    const dto = {
      idDocumentBase64: this.idDocumentBase64,
      proofOfAddressBase64: this.proofOfAddressBase64,
      taxNumber: this.taxNumber
    };

    const userId = '6820d4faa1179f0cb69dd6b3';
    this.loader.startLoader();

    this.investorService.saveIdentityVerification(userId, dto).subscribe({
      next: () => {
        this.getInfo();
        this.loader.stopLoader();
      },
      error: (err) => {
        console.error('Save failed', err);
        this.loader.stopLoader();
      }
    });
  }

  handleFileInput(event: Event, field: 'id' | 'address') {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      if (field === 'id') {
        this.idDocumentBase64 = base64;
      } else {
        this.proofOfAddressBase64 = base64;
      }
    };
    reader.readAsDataURL(file);
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
