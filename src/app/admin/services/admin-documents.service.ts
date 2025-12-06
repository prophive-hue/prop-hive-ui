import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Pagination, ResponseMessage} from './admin-properties.service';

@Injectable({
  providedIn: 'root'
})
export class AdminDocumentsService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor() {
  }

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

  createDocument(document: any): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.baseUrl}/document/create`, document)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllDDocuments(paginator: Pagination): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/document`, paginator)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteDocument(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/document/${id}`, )
      .pipe(
        catchError(this.handleError)
      );
  }
}
