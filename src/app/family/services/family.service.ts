import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FamilyI } from '../interfaces/family-i';
import { UserI } from '../../credentials/interfaces/user-i';
import { environment } from '../../../environments/environment';
import { PerteneceI } from '../interfaces/pertenece-i';
import { Recordatorio } from '../../reminder/interfaces/recordatorio';
import { InviteI } from '../interfaces/invite-i';

@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  private apiUrl = `${environment.apiUrl}/familias`;
  private usersApiUrl = `${environment.apiUrl}/usuarios`;
  private perteneceApiUrl = `${environment.apiUrl}/pertenece`;

  private remainderApiUrl = `${environment.apiUrl}/recordatorios`;

  constructor(private http: HttpClient) {}

  createFamily(
    family: FamilyI,
    userId: number | undefined
  ): Observable<FamilyI> {
    return this.http.post<FamilyI>(`${this.apiUrl}`, {
      ...family,
      userId,
    });
  }

  joinFamily(
    familyCode: number | undefined,
    userId: number | undefined,
    rol: string
  ): Observable<PerteneceI> {
    const relationBody: PerteneceI = {
      familia_id: familyCode,
      usuario_id: userId,
      rol: rol,
      id: null,
    };

    return this.http.post<PerteneceI>(`${this.perteneceApiUrl}`, relationBody);
  }

  getFamilyById(familiaId: number): Observable<FamilyI> {
    return this.http.get<FamilyI>(`${this.apiUrl}/${familiaId}`);
  }

  getUsersByFamily(familiaId: number): Observable<UserI[]> {
    return this.http.get<UserI[]>(
      `${this.perteneceApiUrl}/family/${familiaId}/users`
    );
  }

  getRelationshipByFamilyId(
    familiaId: number | null | undefined
  ): Observable<PerteneceI[]> {
    return this.http.get<PerteneceI[]>(
      `${this.perteneceApiUrl}/family/${familiaId}`
    );
  }

  deleteFamily(familyId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${familyId}`);
  }

  updateFamilyId(userId: number, familiaId: number): Observable<UserI> {
    return this.http.put<UserI>(
      `${this.usersApiUrl}/${userId}/familia?familia_id=${familiaId}`,
      {}
    );
  }

  updateFamilyById(
    familiaId: number,
    updatedFamily: FamilyI
  ): Observable<FamilyI> {
    return this.http.put<FamilyI>(`${this.apiUrl}/${familiaId}`, updatedFamily);
  }

  getUserById(userId: number | undefined): Observable<UserI> {
    return this.http.get<UserI>(`${this.usersApiUrl}/roles/${userId}`);
  }

  removeMember(relationshipId: number | null) {
    return this.http.delete(`${this.perteneceApiUrl}/${relationshipId}`);
  }

  sendFamilyInvite(email: InviteI): Observable<InviteI> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<InviteI>(this.remainderApiUrl, email, { headers });
  }
}
