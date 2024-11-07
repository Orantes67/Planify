import { Component } from '@angular/core';
import { CredentialsService } from '../services/credentials.service';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']  
})
export class RegisterComponent {
  public sectionInfoPersonal: string = 'Información Personal';
  public sectionInfoCorreo: string = 'Correo';
  public sectionInfoContrasena: string = 'Contraseña y Confirmación';
  confirm_password: string = '';


  user: Usuario = {
    nombre: '',
    apellido_pat: '',
    apellido_mat: '',
    correo: '',
    rol:'sin rol',
    familia_id:2,
    contrasena: ''

  };

  constructor(
    private credentialsService: CredentialsService,
    private router: Router
  ) {}

  register() {
  console.log(this.user)
    this.credentialsService.register(this.user).subscribe(
      () => {
        alert('Usuario registrado con éxito');
        this.router.navigate(['login']);
      },
      (error) => alert('Error al registrar el usuario')
    );
  }
  
  

  navigateToLogin() {
    this.router.navigate(['login']);
  }
}
