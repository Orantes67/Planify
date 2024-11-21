import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Activities } from '../interfaces/activities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private apiUrl = `${environment.apiUrl}/actividades`; 

  constructor(private http: HttpClient) {}

  createActividad(actividad: Activities): Observable<Activities> {
    return this.http.post<Activities>(this.apiUrl, actividad);
  }

  getActividad(): Observable<Activities[]> {
    return this.http.get<Activities[]>(this.apiUrl);
  }

  deleteActividad(actividad_id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${actividad_id}`);
  }

  updateActividad(actividad_id: number, actividad: Activities): Observable<Activities> {
    return this.http.put<Activities>(`${this.apiUrl}/${actividad_id}`, actividad);
  }
}
