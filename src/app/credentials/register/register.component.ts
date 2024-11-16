import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CredentialsService } from '../services/credentials.service';
import { UserI } from '../interfaces/user-i';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  @Output() registerSuccess = new EventEmitter<void>();
  registerForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private credentialsService: CredentialsService
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido_pat: ['', Validators.required],
      apellido_mat: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      rol: ['miembro', Validators.required],
      familia_id: [3, Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register() {
    if (this.registerForm.invalid) return;
    const user: UserI = this.registerForm.value;

    this.credentialsService.registerUser(user).subscribe({
      next: () => this.registerSuccess.emit(),
      error: (err) =>
        (this.errorMessage =
          'Error al registrarse. Inténtalo de nuevo.' +
          '\n' +
          err.error.detail),
    });
  }
}
