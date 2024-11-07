import { Component } from '@angular/core';
import { CredentialsService } from '../services/credentials.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { nombre_usuario:'',correo: '', contrasena: '' };

  constructor(private credentialsService: CredentialsService, private router: Router) {}

  login() {
    console.log(this.credentials)
    this.credentialsService.login(this.credentials).subscribe(
      () => this.router.navigate(['/Home']), 
      (error) => alert('Credenciales incorrectas')
    );
  }
  navigateToRegister() {
    this.router.navigate(['/register']); 
  }
}

