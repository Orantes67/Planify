import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FamilyI } from '../interfaces/family-i';
import { UserI } from '../../credentials/interfaces/user-i';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  private apiUrl = `${environment.apiUrl}/familias`;
  private usersApiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  createFamily(family: FamilyI, userId: number): Observable<FamilyI> {
    return this.http.post<FamilyI>(`${this.apiUrl}`, {
      ...family,
      userId,
    });
  }

  updateUserFamily(updatedUser: UserI): Observable<UserI> {
    return this.http.put<UserI>(
      `${this.usersApiUrl}/${updatedUser.usuario_id}`,
      updatedUser
    );
  }

  getFamilyById(familiaId: number): Observable<FamilyI> {
    return this.http.get<FamilyI>(`${this.apiUrl}/${familiaId}`);
  }

  getUsersByFamily(familiaId: number): Observable<UserI[]> {
    return this.http.get<UserI[]>(
      `${this.usersApiUrl}/familia/${familiaId}/usuarios`
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
