import { Component, OnInit } from '@angular/core';
import { faList, faUsers, faBell } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit {
  faList = faList;
  faUsers = faUsers;
  faBell = faBell;

  public fechaActual: string = '';

  constructor() {}

  ngOnInit(): void {
    this.actualizarFecha();
  }
  
  actualizarFecha(): void {
    this.fechaActual = new Date().toLocaleDateString('es-ES');
  }
}
