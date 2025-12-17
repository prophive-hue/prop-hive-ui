import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


export interface CreateProperty {
  title: string,
  location: string,
  category: string,
  description: string,
  developer: string,
  expectedRoi: number,
  totalInvestment: number,
  status: string,
  base64Images: Base64File[];
}

export interface Base64File {
  base64: string;
}


export interface Property {
  id: string,
  title: string,
  location: string,
  category: string,
  description: string,
  developer: string,
  expectedRoi: number,
  totalInvestment: number,
  status: string,
  imageUrls: string[];
}

export interface ResponseMessage {
  message: string;
}

export interface PropertyResponse {
  content: Property[];
  totalElements: number;
}

export interface Pagination{
  page: number;
  size: number;
}

export interface AdminDocumentsPagination extends Pagination {
  documentName: string;
  category: string;
}

export interface AdminDevelopersPagination extends Pagination {
  companyName: string;
}

export interface AdminPropertiesPagination extends Pagination {
  propertyName: string;
}

export interface AdminDeductionsPagination extends Pagination {
  deductionName: string;
}

export interface AdminInvestorsPagination extends Pagination {
  investorName: string;
}



@Injectable({
  providedIn: 'root'
})


export class AdminPropertiesService {
  private http = inject(HttpClient);
  private baseUrl = 'https://ylkgde9us8.execute-api.eu-west-1.amazonaws.com/dev/';
  constructor() { }


  createProperty(propertyData: CreateProperty): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.baseUrl}/property/create`, propertyData)
      .pipe(
        catchError(this.handleError)
      );
  }


  getAllProperties(paginator:Pagination): Observable<PropertyResponse> {
    return this.http.post<PropertyResponse>(`${this.baseUrl}/property/all`, paginator)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllHomeProperties(paginator:Pagination): Observable<PropertyResponse> {
    return this.http.post<PropertyResponse>(`${this.baseUrl}/property/all/home`, paginator)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProperty(id:string): Observable<Property> {
    return this.http.get<Property>(`${this.baseUrl}/property/${id}`)
      .pipe(
        catchError(this.handleError)
      );
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
}
