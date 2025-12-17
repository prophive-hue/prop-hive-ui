import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class InvestorService {
  private baseUrl = 'https://ylkgde9us8.execute-api.eu-west-1.amazonaws.com/dev/investor';

  constructor(private http: HttpClient) {}

  savePersonalInformation(userId: string, personalInfo: any): Observable<any> {
    const url = `${this.baseUrl}/${userId}/personal/information`;
    return this.http.put(url, personalInfo);
  }

  saveIdentityVerification(userId: string, dto: any){
    const url = `${this.baseUrl}/${userId}/identity/verification`;
    return this.http.put(url, dto);
  }

  saveBankingDetails(userId: string, dto: any): Observable<any> {
    const url = `${this.baseUrl}/${userId}/banking/details`;
    return this.http.put(url, dto);
  }

  saveFinancialDetails(userId: string, dto: any): Observable<any> {
    const url = `${this.baseUrl}/${userId}/financial/details`;
    return this.http.put(url, dto);
  }

  saveRiskProfile(userId: string, dto: any): Observable<any> {
    const url = `${this.baseUrl}/${userId}/risk/profile`;
    return this.http.put(url, dto);
  }

  saveLegalAgreements(userId: string, dto: any): Observable<any> {
    const url = `${this.baseUrl}/${userId}/legal/agreements`;
    return this.http.put(url, dto);
  }

  saveKycAml(userId: string, dto: any): Observable<any> {
    const url = `${this.baseUrl}/${userId}/kyc/aml`;
    return this.http.put(url, dto);
  }

  saveCreditCheck(userId: string, dto: any): Observable<any> {
    const url = `${this.baseUrl}/${userId}/credit/check`;
    return this.http.put(url, dto);
  }


  getStepDetails(userId:string, step:number): Observable<any> {
    const url = `${this.baseUrl}/${userId}/step/${step}`;
    return this.http.get(url);
  }
}

