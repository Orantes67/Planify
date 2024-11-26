import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventI } from '../interfaces/event-i';
import { EventCreateOrUpdateI } from '../interfaces/event-create-or-update-i';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private apiUrl = 'https://planifyapi.integrador.xyz/eventos';

  constructor(private http: HttpClient) {}

  getEventsByFamilyId(familyId: number): Observable<EventI[]> {
    return this.http.get<EventI[]>(`${this.apiUrl}/familia/${familyId}`);
  }

  createEvent(event: EventCreateOrUpdateI): Observable<EventI> {
    return this.http.post<EventI>(this.apiUrl, event);
  }

  updateEvent(
    eventId: number | null,
    event: EventCreateOrUpdateI
  ): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${eventId}`, event);
  }

  deleteEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`);
  }
}
