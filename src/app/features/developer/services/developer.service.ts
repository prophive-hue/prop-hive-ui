import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DeveloperRepository, DeveloperProperty, SubmitPropertyRequest } from '../../../core/api/repositories/developer.repository';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  private repository = inject(DeveloperRepository);

  getMyProperties(userId: string, pagination: any): Observable<any> {
    return this.repository.getMyProperties(userId, pagination);
  }

  submitProperty(userId: string, request: SubmitPropertyRequest): Observable<{ message: string }> {
    return this.repository.submitProperty(userId, request);
  }

  resubmitProperty(userId: string, propertyId: string, request: SubmitPropertyRequest): Observable<{ message: string }> {
    return this.repository.resubmitProperty(userId, propertyId, request);
  }
}
