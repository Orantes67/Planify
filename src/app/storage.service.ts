import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  guardarDatos(clave: string, datos: any): void {
    localStorage.setItem(clave, JSON.stringify(datos));
  }

  obtenerDatos(clave: string): any {
    const datos = localStorage.getItem(clave);
    return datos ? JSON.parse(datos) : null;
  }

  eliminarDatos(clave: string): void {
    localStorage.removeItem(clave);
  }
}
