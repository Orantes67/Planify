import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FamilyI } from '../interfaces/family-i';
import { UserI } from '../../credentials/interfaces/user-i';
import { environment } from '../../../environments/environment';
import { PerteneceI } from '../interfaces/pertenece-i';

@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  private apiUrl = `${environment.apiUrl}/familias`;
  private usersApiUrl = `${environment.apiUrl}/usuarios`;
  private perteneceApiUrl = `${environment.apiUrl}/pertenece`;

  constructor(private http: HttpClient) {}

  createFamily(family: FamilyI, userId: number): Observable<FamilyI> {
    return this.http.post<FamilyI>(`${this.apiUrl}`, {
      ...family,
      userId,
    });
  }

  joinFamily(
    familyCode: number,
    userId: number,
    rol: string
  ): Observable<PerteneceI> {
    const relationBody: PerteneceI = {
      familia_id: familyCode,
      usuario_id: userId,
      rol: rol,
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

  getRelationshipByFamilyId(familiaId: number): Observable<PerteneceI[]> {
    return this.http.get<PerteneceI[]>(
      `${this.perteneceApiUrl}/family/${familiaId}`
    );
  }

  removeMember(memberId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${memberId}`);
  }

  updateFamilyId(userId: number, familiaId: number): Observable<UserI> {
    return this.http.put<UserI>(
      `${this.usersApiUrl}/${userId}/familia?familia_id=${familiaId}`,
      {}
    );
  }
}
