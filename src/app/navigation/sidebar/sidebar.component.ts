import { Component } from '@angular/core';
import { faList, faUsers, faBell } from '@fortawesome/free-solid-svg-icons';
import { faInstagramSquare, faFacebookSquare,faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  faList = faList;
  faUsers = faUsers;
  faBell = faBell;
  faFacebookSquare=faFacebookSquare;
  faInstagramSquare=faInstagramSquare;
  faTwitterSquare=faTwitterSquare;
  fechaActual = new Date() ;
}
