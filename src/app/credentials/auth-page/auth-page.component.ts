import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent {
  isRegistering = false;

  constructor(private router: Router) {}

  toggleAuthMode() {
    this.isRegistering = !this.isRegistering;
  }

  onLoginSuccess() {
    this.router.navigate(['/family']);
  }
}
