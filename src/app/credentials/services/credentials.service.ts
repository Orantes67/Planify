import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { tap,catchError } from 'rxjs/operators';
import { Usuario } from '../../models/usuario';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private apiUrl = 'http://3.224.128.21:8000/';
  constructor(private http: HttpClient) {}

  register(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}usuarios/register`, user);
  } 
  login(credentials: { user_name: string; user_password: string }): Observable<any> {
    console.log(credentials);
    
    const params = {
      user_name: credentials.user_name,
      user_password: credentials.user_password
    };
  
    return this.http.post(`${this.apiUrl}usuarios/login`, {}, { params }).pipe(
      tap((response: any) => {
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      }),
      catchError((error) => {
        console.error("Login failed", error);
        return throwError(error);
      })
    );
  }
  
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}usuarios`);
  }
}
