import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base/base-http.service';

export interface DocumentPagination {
  page: number;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminDocumentsRepository extends BaseHttpService {

  createDocument(document: any): Observable<{ message: string }> {
    return this.post<{ message: string }>('/document/create', document);
  }

  getAllDocuments(pagination: DocumentPagination): Observable<any> {
    return this.post<any>('/document', pagination);
  }

  deleteDocument(id: string): Observable<any> {
    return this.delete<any>(`/document/${id}`);
  }
}