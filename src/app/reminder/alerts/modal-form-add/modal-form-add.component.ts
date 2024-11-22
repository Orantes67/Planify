import { Component,Inject, EventEmitter, Output} from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recordatorio } from '../../interfaces/recordatorio';
import { RecordatoriosService } from '../../recordatorios.service';
@Component({
  selector: 'app-modal-form-add',
  templateUrl: './modal-form-add.component.html',
  styleUrl: './modal-form-add.component.css'
})
export class ModalFormAddComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Output() RecordatorioCreado = new EventEmitter<Recordatorio>();
  constructor( private recordatoriosService:RecordatoriosService){}
  recordatorio: Recordatorio = {
    recordatorio_id:0,
    contenido: '',
    id_familia: 0,
    hora_limite: '',
  };

  crearRecordatorio(): void {
    console.log('Nuevo Recordatorio:', this.recordatorio);
    this.RecordatorioCreado.emit(this.recordatorio);
    this.resetForm();
    this.cerrar.emit(); 
  }
  resetForm(): void {
    this.recordatorio = {
      recordatorio_id:0,
    contenido: '',
    id_familia: 0,
    hora_limite: '',
  };
  }
}
