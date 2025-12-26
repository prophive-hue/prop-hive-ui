import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminDocumentsRepository, DocumentPagination } from '../../../core/api/repositories/admin-documents.repository';

export { DocumentPagination } from '../../../core/api/repositories/admin-documents.repository';

@Injectable({
  providedIn: 'root'
})
export class AdminDocumentsService {
  private repository = inject(AdminDocumentsRepository);

  createDocument(document: any): Observable<{ message: string }> {
    return this.repository.createDocument(document);
  }

  getAllDDocuments(pagination: DocumentPagination): Observable<any> {
    return this.repository.getAllDocuments(pagination);
  }

  deleteDocument(id: string): Observable<any> {
    return this.repository.deleteDocument(id);
  }
}
