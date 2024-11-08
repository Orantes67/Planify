import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CredentialsService } from '../services/credentials.service';
import { CredentialsI } from '../interfaces/credentials-i';
import { UserI } from '../interfaces/user-i';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<UserI>();
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private credentialsService: CredentialsService
  ) {
    this.loginForm = this.fb.group({
      nombre_usuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm.invalid) return;
    const credentials: CredentialsI = this.loginForm.value;

    this.credentialsService.loginUser(credentials).subscribe({
      next: (response: any) => {
        const user: UserI = response.user;
        this.loginSuccess.emit(user);
      },
      error: () =>
        (this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.'),
    });
  }
}
