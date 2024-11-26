import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-family-manage',
  templateUrl: './modal-family-manage.component.html',
  styleUrls: ['./modal-family-manage.component.css'],
})
export class ModalFamilyManageComponent {
  inputData: string = '';
  touched: boolean = false;
  alerta: { mensaje: string; estilo: 'exito' | 'error' } | null = null;

  constructor(
    public dialogRef: MatDialogRef<ModalFamilyManageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; placeholder: string }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveInput(): void {
    if (this.inputData.trim()) {
      this.alerta = {
        mensaje: '¡Datos guardados con éxito!',
        estilo: 'exito',
      };

      setTimeout(() => {
        this.dialogRef.close(this.inputData);
      }, 1000);
    } else {
      console.log("error")
      this.alerta = {
        mensaje: 'El campo es obligatorio.',
        estilo: 'error',
      };
    }
  }
}
