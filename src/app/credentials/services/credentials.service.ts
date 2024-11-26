import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserI } from '../interfaces/user-i';
import { CredentialsI } from '../interfaces/credentials-i';
import { UserSerialization } from '../interfaces/user-serialization';
import { LoginResponseI } from '../interfaces/login-response-i';

@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  registerUser(data: UserI): Observable<UserSerialization> {
    return this.http.post<UserSerialization>(`${this.apiUrl}/register`, data);
  }

  loginUser(credentials: CredentialsI): Observable<LoginResponseI> {
    return this.http
      .post<LoginResponseI>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response: LoginResponseI) => {
          this.setToken(response.access_token);
        })
      );
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
