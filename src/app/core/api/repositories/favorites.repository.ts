import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesRepository extends BaseHttpService {

  addFavorite(userId: string, propertyId: string): Observable<any> {
    return this.post(`/favorites/${userId}/${propertyId}`, {});
  }

  removeFavorite(userId: string, propertyId: string): Observable<any> {
    return this.delete(`/favorites/${userId}/${propertyId}`);
  }

  getFavorites(userId: string): Observable<string[]> {
    return this.get<string[]>(`/favorites/${userId}`);
  }
}
