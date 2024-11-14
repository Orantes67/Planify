import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { UserI } from '../interfaces/user-i';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent {
  isRegistering = false;

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {}

  toggleAuthMode() {
    this.isRegistering = !this.isRegistering;
  }

  onLoginSuccess(user: UserI) {
    this.storageService.guardarUsuario(user);
    
    this.router.navigate(['/family']);
  }
}
