import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Recordatorio } from './interfaces/recordatorio';
@Injectable({
  providedIn: 'root',
})
export class RecordatoriosService {
  private apiUrl = `${environment.apiUrl}/recordatorios`;

  constructor(private http: HttpClient) {}

  createRecordatorio(recordatorio: Recordatorio): Observable<Recordatorio> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<Recordatorio>(this.apiUrl, recordatorio, { headers });
  }
  getRecordatorios(): Observable<Recordatorio[]> {
    return this.http.get<Recordatorio[]>(this.apiUrl);
  }
  updateRecordatorio(recordatorio: Recordatorio): Observable<Recordatorio> {
    return this.http.put<Recordatorio>(
      `${this.apiUrl}/${recordatorio.notificacion_id}`,
      recordatorio
    );
  }
  deleteRecordatorio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método para obtener las 5 notificaciones más próximas
  getNotificacionesProximas(usuario_id: number | undefined): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/proximas/${usuario_id}`);
  }

  getNotificacionesPorCategoria(
    categoria: string,
    usuario_id: number | undefined
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/recordatorios/categoria/${categoria}/${usuario_id}`
    );
  }
}
