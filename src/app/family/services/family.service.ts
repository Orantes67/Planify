import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Family } from '../../models/familia';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  private url_base = 'http://3.224.128.21:8000/familias/';

  constructor(private http: HttpClient) {}

 
  getAllFAMILY(): Observable<Family[]> {
    return this.http.get<Family[]>(this.url_base);
  }

  
  getFAMILYById(id: number): Observable<Family> {
    return this.http.get<Family>(`${this.url_base}${id}`);
  }

 
  createFamily(familia: Family): Observable<Family> {
    return this.http.post<Family>(this.url_base, familia);
  }

  
  updateFamily(id: number, familia: Family): Observable<Family> {
    return this.http.put<Family>(`${this.url_base}${id}`, familia);
  }

  
  deleteFamily(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url_base}${id}`);
  }
}
