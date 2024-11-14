import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-modal-family-delete-miembro',
  templateUrl: './modal-family-delete-miembro.component.html',
  styleUrl: './modal-family-delete-miembro.component.css'
})
export class ModalFamilyDeleteMiembroComponent {
  constructor(public dialogRef: MatDialogRef<ModalFamilyDeleteMiembroComponent>) {}

  closeDialog(): void {
    this.dialogRef.close(); 
  }
  delete(): void {
   
    this.dialogRef.close(true);
   }
}
