import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CredentialsService } from '../services/credentials.service';
import { CredentialsI } from '../interfaces/credentials-i';
import { UserI } from '../interfaces/user-i';
import { LoginResponseI } from '../interfaces/login-response-i';
import { FamilyService } from '../../family/services/family.service';

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
    private credentialsService: CredentialsService,
    private familyService: FamilyService
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm.invalid) return;
    const credentials: CredentialsI = this.loginForm.value;

    console.log(credentials);

    this.credentialsService.loginUser(credentials).subscribe({
      next: (response: LoginResponseI) => {
        console.log(response);

        let userRes: UserI;
        this.familyService

          .getUserById(response.user.usuario_id)
          .subscribe((user) => {
            userRes = user;
            this.loginSuccess.emit(userRes);
          });
        this.credentialsService.setToken(response.access_token);
      },

      error: () =>
        (this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.'),
    });
  }
}
