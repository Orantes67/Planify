import { Component } from '@angular/core';
import { faList, faUsers, faBell,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import {
  faInstagramSquare,
  faFacebookSquare,
  faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private router: Router) {}
  faList = faList;
  faUsers = faUsers;
  faBell = faBell;
  faFacebookSquare = faFacebookSquare;
  faInstagramSquare = faInstagramSquare;
  faTwitterSquare = faTwitterSquare;
  faLogout = faArrowRightFromBracket
  fechaActual = new Date().toUTCString().slice(4, -3);

  logout() {
    this.router.navigate(['/login']);
  }
}
