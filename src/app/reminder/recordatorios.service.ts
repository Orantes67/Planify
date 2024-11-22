import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Recordatorio } from './interfaces/recordatorio';
@Injectable({
  providedIn: 'root'
})
export class RecordatoriosService {
  private apiUrl = `${environment.apiUrl}/recordatorios`;
  constructor(private http:HttpClient) { }
 
  createRecordatorio(recordatorio:Recordatorio):Observable<Recordatorio>{
    return this.http.post<Recordatorio>(this.apiUrl, recordatorio);
  }
  getRecordatorios(): Observable<Recordatorio[]> {
    return this.http.get<Recordatorio[]>(this.apiUrl);
  }
  updateRecordatorio(recordatorio: Recordatorio): Observable<Recordatorio> {
    return this.http.put<Recordatorio>(`${this.apiUrl}/${recordatorio.recordatorio_id}`, recordatorio);
  }
}
