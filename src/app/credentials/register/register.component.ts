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

  user: Usuario = {
    nombre: '',
    correo: '',
    contrasena: '',
    apellido_pat: '',
    apellido_mat: '',
    id: 1,
    rol:'',
    familia_id:'null'

  };

  constructor(
    private credentialsService: CredentialsService,
    private router: Router
  ) {}

  register() {
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
