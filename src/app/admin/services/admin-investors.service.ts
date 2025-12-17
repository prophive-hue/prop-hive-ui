import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Pagination, ResponseMessage} from './admin-properties.service';

@Injectable({
  providedIn: 'root'
})
export class AdminInvestorsService {

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


  getAllInvestors(paginator:Pagination): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/investor/all`, paginator)
      .pipe(
        catchError(this.handleError)
      );
  }

  suspendInvestor(email:string){
    return this.http.put<any>(`${this.baseUrl}/investor/suspend/${email}`,null)
      .pipe(
        catchError(this.handleError)
      );
  }

  verifyInvestor(verify:any){
    return this.http.put<any>(`${this.baseUrl}/investor/verify`,verify)
      .pipe(
        catchError(this.handleError)
      );
  }
}
