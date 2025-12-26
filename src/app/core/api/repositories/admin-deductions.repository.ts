import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base/base-http.service';

export interface DeductionPagination {
  page: number;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminDeductionsRepository extends BaseHttpService {

  createDeduction(deduction: any): Observable<{ message: string }> {
    return this.post<{ message: string }>('/deduction/create', deduction);
  }

  getAllDeductions(pagination: DeductionPagination): Observable<any> {
    return this.post<any>('/deduction', pagination);
  }
}