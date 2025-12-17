import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Pagination, PropertyResponse, ResponseMessage} from './admin-properties.service';
import {CreateDeveloper} from './admin-developers.service';

@Injectable({
  providedIn: 'root'
})
export class AdminDeductionsService {

  private http = inject(HttpClient);
  private baseUrl = 'https://ylkgde9us8.execute-api.eu-west-1.amazonaws.com/dev/';
  constructor() { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error?.message ||
        `Server returned code ${error.status}, error message: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  createDeduction(deduction:any): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.baseUrl}/deduction/create`, deduction)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllDeductions(paginator:Pagination): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/deduction`, paginator)
      .pipe(
        catchError(this.handleError)
      );
  }
}
