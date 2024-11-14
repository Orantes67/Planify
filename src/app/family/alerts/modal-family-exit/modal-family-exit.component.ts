import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-family-exit',
  templateUrl: './modal-family-exit.component.html',
  styleUrl: './modal-family-exit.component.css'
})
export class ModalFamilyExitComponent {

  constructor(public dialogRef: MatDialogRef<ModalFamilyExitComponent>) {}

  closeDialog(): void {
    this.dialogRef.close(); 
  }
  delete(): void {
   
    this.dialogRef.close(true);
   }
}
