import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { tap,catchError } from 'rxjs/operators';
import { Usuario } from '../../models/usuario';
import { Usuarios } from '../../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private apiUrl = 'http://3.224.128.21:8000/';
  constructor(private http: HttpClient) {}

  register(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}usuarios/register`, user);
  }
  login(credentials: { nombre_usuario:string;correo: string; contrasena: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}usuarios/register`, credentials).pipe(
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
}
