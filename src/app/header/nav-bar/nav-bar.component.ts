import { Component } from '@angular/core';
import { PerfilComponent } from "../perfil/perfil.component";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [PerfilComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  public fechaActual: string = '';

  constructor(){
    this.actualizarFecha();
  }
  
  actualizarFecha(): void {
    this.fechaActual = new Date().toLocaleDateString('es-ES');
  }
}
