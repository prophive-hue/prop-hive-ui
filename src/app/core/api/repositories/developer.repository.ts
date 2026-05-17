import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base/base-http.service';

export interface DeveloperProperty {
  id: string;
  title: string;
  location: string;
  category: string;
  description: string;
  developer: string;
  expectedRoi: number;
  totalInvestment: number;
  status: string;
  approvalStatus: string;
  rejectionReason: string;
  imageUrls: string[];
}

export interface SubmitPropertyRequest {
  title: string;
  location: string;
  category: string;
  description: string;
  expectedRoi: number;
  totalInvestment: number;
  status: string;
  base64Images?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class DeveloperRepository extends BaseHttpService {

  getMyProperties(userId: string, pagination: any): Observable<any> {
    return this.post<any>(`/property/${userId}/mine`, pagination);
  }

  submitProperty(userId: string, request: SubmitPropertyRequest): Observable<{ message: string }> {
    return this.post<{ message: string }>(`/property/${userId}/submit`, request);
  }

  resubmitProperty(userId: string, propertyId: string, request: SubmitPropertyRequest): Observable<{ message: string }> {
    return this.put<{ message: string }>(`/property/${userId}/resubmit/${propertyId}`, request);
  }
}
