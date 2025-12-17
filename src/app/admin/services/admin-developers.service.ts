import {inject, Injectable} from '@angular/core';
import {RegisterRequest} from '../../auth/services/auth.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {CreateProperty, Pagination, Property, PropertyResponse, ResponseMessage} from './admin-properties.service';



export interface CreateDeveloper {
  companyName: string;
  email: string;
  phone: string;
  developerType: string;
  yearsExperience: string;
  companyDescription: string;
  contactPerson: RegisterRequest;
}

export interface Developer {
  companyName: string;
  email: string;
  phone: string;
  developerType: string;
  yearsExperience: string;
  companyDescription: string;
}

export interface DeveloperResponse {
  content: Developer[];
  totalElements: number;
}


@Injectable({
  providedIn: 'root'
})
export class AdminDevelopersService {

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

  getAllDevelopers(paginator:Pagination): Observable<DeveloperResponse> {
    return this.http.post<DeveloperResponse>(`${this.baseUrl}/developer/all`, paginator)
      .pipe(
        catchError(this.handleError)
      );
  }

  createDeveloper(propertyData: CreateDeveloper): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.baseUrl}/developer/create`, propertyData)
      .pipe(
        catchError(this.handleError)
      );
  }
}
