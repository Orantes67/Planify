import { Injectable } from '@angular/core';
import { UserI } from '../credentials/interfaces/user-i';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly USER_KEY = 'loggedInUser';

  constructor() { }

  guardarUsuario(user: UserI): void {
    this.guardarDatos(this.USER_KEY, user);
  }

  obtenerUsuario(): UserI | null {
    return this.obtenerDatos(this.USER_KEY);
  }

  eliminarUsuario(): void {
    this.eliminarDatos(this.USER_KEY);
  }

  private guardarDatos(clave: string, datos: any): void {
    localStorage.setItem(clave, JSON.stringify(datos));
  }

  private obtenerDatos(clave: string): any {
    const datos = localStorage.getItem(clave);
    return datos ? JSON.parse(datos) : null;
  }

  private eliminarDatos(clave: string): void {
    localStorage.removeItem(clave);
  }
}
