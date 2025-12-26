import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { InvestorRepository } from '../../../core/api/repositories/investor.repository';

@Injectable({
  providedIn: 'root'
})
export class InvestorService {
  private repository = inject(InvestorRepository);

  savePersonalInformation(userId: string, personalInfo: any): Observable<any> {
    return this.repository.savePersonalInformation(userId, personalInfo);
  }

  saveIdentityVerification(userId: string, dto: any): Observable<any> {
    return this.repository.saveIdentityVerification(userId, dto);
  }

  saveBankingDetails(userId: string, dto: any): Observable<any> {
    return this.repository.saveBankingDetails(userId, dto);
  }

  saveFinancialDetails(userId: string, dto: any): Observable<any> {
    return this.repository.saveFinancialDetails(userId, dto);
  }

  saveRiskProfile(userId: string, dto: any): Observable<any> {
    return this.repository.saveRiskProfile(userId, dto);
  }

  saveLegalAgreements(userId: string, dto: any): Observable<any> {
    return this.repository.saveLegalAgreements(userId, dto);
  }

  saveKycAml(userId: string, dto: any): Observable<any> {
    return this.repository.saveKycAml(userId, dto);
  }

  saveCreditCheck(userId: string, dto: any): Observable<any> {
    return this.repository.saveCreditCheck(userId, dto);
  }

  getStepDetails(userId: string, step: number): Observable<any> {
    return this.repository.getStepDetails(userId, step);
  }
}

