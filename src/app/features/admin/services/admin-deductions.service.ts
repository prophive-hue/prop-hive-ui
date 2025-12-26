import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminDeductionsRepository, DeductionPagination } from '../../../core/api/repositories/admin-deductions.repository';

export { DeductionPagination } from '../../../core/api/repositories/admin-deductions.repository';

@Injectable({
  providedIn: 'root'
})
export class AdminDeductionsService {
  private repository = inject(AdminDeductionsRepository);

  createDeduction(deduction: any): Observable<{ message: string }> {
    return this.repository.createDeduction(deduction);
  }

  getAllDeductions(pagination: DeductionPagination): Observable<any> {
    return this.repository.getAllDeductions(pagination);
  }
}
