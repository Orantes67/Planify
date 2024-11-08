import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserI } from '../interfaces/user-i';
import { CredentialsI } from '../interfaces/credentials-i';
import { UserSerialization } from '../interfaces/user-serialization';

@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  registerUser(data: UserI): Observable<UserSerialization> {
    return this.http.post<UserSerialization>(`${this.apiUrl}/register`, data);
  }

  loginUser(credentials: CredentialsI): Observable<UserSerialization> {
    const params = new HttpParams()
      .set('user_name', credentials.nombre_usuario)
      .set('user_password', credentials.contrasena);

    return this.http.post<UserSerialization>(`${this.apiUrl}/login`, null, {
      params,
    });
  }
}
