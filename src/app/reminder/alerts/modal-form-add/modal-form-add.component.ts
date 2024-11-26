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
  recordatorio: Recordatorio = {
    notificacion_id: 0,
    titulo: '',
    contenido: '',
    fecha_hora: '',
    evento_id: null,
    familia_id: null,
    usuario_id: 0,
    categoria: '',
    correo_destinatario: []
  };

  correos: string = '';  // Variable para manejar la cadena de correos

  constructor(
    private recordatoriosService: RecordatoriosService,
    private storageService: StorageService
  ) {}

  crearRecordatorio(): void {
    // Asignar usuario_id desde el servicio de almacenamiento
    const usuario = this.storageService.obtenerUsuario();
    if (usuario) {
      this.recordatorio.usuario_id = usuario.usuario_id;
    } else {
      console.error('Usuario no encontrado.');
      return;
    }

    // Convertir la cadena de correos a un array
    if (this.correos.trim()) {
      this.recordatorio.correo_destinatario = this.correos.split(',').map(correo => correo.trim());
    } else {
      this.recordatorio.correo_destinatario = [];
    }

    // Convertir fecha_hora al formato ISO
    const fechaISO = new Date(this.recordatorio.fecha_hora).toISOString();
    this.recordatorio.fecha_hora = fechaISO;

    console.log('Nuevo Recordatorio:', this.recordatorio);

    // Llamar al servicio para crear el recordatorio
    this.recordatoriosService.createRecordatorio(this.recordatorio).subscribe(
      (respuesta) => {
        console.log('Recordatorio creado:', respuesta);
      
        this.resetForm();  // Resetear el formulario
        this.cerrar.emit();  // Cerrar el modal
      },
      (error) => {
        console.error('Error al crear el recordatorio:', error);
      }
    );
  }

  resetForm(): void {
    this.recordatorio = {
      notificacion_id: 0,
      titulo: '',
      contenido: '',
      fecha_hora: '',
      evento_id: null,
      familia_id: null,
      usuario_id: 0,
      categoria: '',
      correo_destinatario: []
    };
    this.correos = '';  // Limpiar el campo de correos
  }
}