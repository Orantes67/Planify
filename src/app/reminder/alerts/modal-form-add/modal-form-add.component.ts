import { Component,Inject, EventEmitter, Output} from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recordatorio } from '../../interfaces/recordatorio';
import { RecordatoriosService } from '../../recordatorios.service';
import { StorageService } from '../../../services/storage.service';
@Component({
  selector: 'app-modal-form-add',
  templateUrl: './modal-form-add.component.html',
  styleUrl: './modal-form-add.component.css'
})
export class ModalFormAddComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Output() RecordatorioCreado = new EventEmitter<Recordatorio>();
  constructor( private recordatoriosService:RecordatoriosService, private storageservice:StorageService){
  }
  recordatorio: Recordatorio = {
    notificacion_id:0,
    titulo: "",
    contenido:"",
    fecha_hora: "",
    evento_id: null,
    familia_id: null,
    usuario_id: 0,
    categoria: "",
    correo_destinatario: null
  };

  crearRecordatorio(): void {
    console.log('Nuevo Recordatorio:', this.recordatorio);
    this.recordatorio.usuario_id=this.storageservice.obtenerUsuario().usuario_id;
    this.RecordatorioCreado.emit(this.recordatorio);
    this.resetForm();
    this.cerrar.emit(); 
  }
  resetForm(): void {
    this.recordatorio = {
    notificacion_id:0,
    titulo: "",
    contenido:"",
    fecha_hora: "",
    evento_id: null,
    familia_id: null,
    usuario_id: 0,
    categoria: "",
    correo_destinatario: null
  };
  }
}
