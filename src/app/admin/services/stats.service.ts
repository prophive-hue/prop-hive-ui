import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Pagination} from './admin-properties.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/v1';

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


  getAdminInvestorStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/stats/admin/investors`)
      .pipe(
        catchError(this.handleError)
      );
  }
}
