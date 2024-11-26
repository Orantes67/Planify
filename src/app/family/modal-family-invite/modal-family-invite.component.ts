import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-family-invite',
  templateUrl: './modal-family-invite.component.html',
})
export class ModalFamilyInviteComponent {
  email: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalFamilyInviteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { familyName: string }
  ) {}

  confirmInvite(): void {
    if (!this.email || !this.email.includes('@')) {
      alert('Por favor ingresa un correo válido.');
      return;
    }
    this.dialogRef.close(this.email);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
