import { Component, Inject,Output,EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-family-manage',
  templateUrl: './modal-family-manage.component.html',
  styleUrl: './modal-family-manage.component.css',
})
export class ModalFamilyManageComponent {
  inputData: string = '';
  @Output() cerrar: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<ModalFamilyManageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; placeholder: string }
  ) {}

  closeDialog(): void { 
    this.dialogRef.close();
  }

  saveInput(): void {
    this.dialogRef.close(this.inputData);
  }

  onClose(): void {
    this.cerrar.emit();
    this.closeDialog();
  }
}
