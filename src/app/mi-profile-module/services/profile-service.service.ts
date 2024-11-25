import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../../credentials/interfaces/user-i';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileServiceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  updateUser(user: UserI): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/${user.usuario_id}`, user);
  }

  getUser(userId: number): Observable<UserI> {
    return this.http.get<UserI>(`${this.apiUrl}/usuarios/${userId}`);
  }
}
