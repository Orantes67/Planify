import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-famoly-delete',
  templateUrl: './modal-famoly-delete.component.html'
})
export class ModalFamolyDeleteComponent {
  

  constructor(public dialogRef: MatDialogRef<ModalFamolyDeleteComponent>) {}

  closeDialog(): void {
    this.dialogRef.close(); 
  }
  delete(): void {
   
    this.dialogRef.close(true); 
  }
}
