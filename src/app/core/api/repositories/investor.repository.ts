import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class InvestorRepository extends BaseHttpService {

  savePersonalInformation(userId: string, personalInfo: any): Observable<any> {
    return this.put(`/investor/${userId}/personal/information`, personalInfo);
  }

  saveIdentityVerification(userId: string, dto: any): Observable<any> {
    return this.put(`/investor/${userId}/identity/verification`, dto);
  }

  saveBankingDetails(userId: string, dto: any): Observable<any> {
    return this.put(`/investor/${userId}/banking/details`, dto);
  }

  saveFinancialDetails(userId: string, dto: any): Observable<any> {
    return this.put(`/investor/${userId}/financial/details`, dto);
  }

  saveRiskProfile(userId: string, dto: any): Observable<any> {
    return this.put(`/investor/${userId}/risk/profile`, dto);
  }

  saveLegalAgreements(userId: string, dto: any): Observable<any> {
    return this.put(`/investor/${userId}/legal/agreements`, dto);
  }

  saveKycAml(userId: string, dto: any): Observable<any> {
    return this.put(`/investor/${userId}/kyc/aml`, dto);
  }

  saveCreditCheck(userId: string, dto: any): Observable<any> {
    return this.put(`/investor/${userId}/credit/check`, dto);
  }

  getStepDetails(userId: string, step: number): Observable<any> {
    return this.get(`/investor/${userId}/step/${step}`);
  }
}