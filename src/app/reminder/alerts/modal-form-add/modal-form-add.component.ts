import { Component, EventEmitter, Output } from '@angular/core';
import { Recordatorio } from '../../interfaces/recordatorio';
import { RecordatoriosService } from '../../recordatorios.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-modal-form-add',
  templateUrl: './modal-form-add.component.html',
  styleUrls: ['./modal-form-add.component.css'],
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
    correo_destinatario: [],
  };

  correos: string = '';
  alerta: { mensaje: string; estilo: string } | null = null;
  formSubmitted: boolean = false; 
  esHoraValida: boolean = true; 
  esCorreoValido: boolean = true; 

  constructor(
    private recordatoriosService: RecordatoriosService,
    private storageService: StorageService
  ) {}

  crearRecordatorio(): void {
    this.formSubmitted = true;

   
    const horaActual = new Date();
    const horaLimite = new Date(this.recordatorio.fecha_hora);
    if (horaLimite <= horaActual) {
      this.esHoraValida = false;
      this.mostrarAlerta('La hora límite debe ser posterior a la hora actual.', 'error');
      return;
    } else {
      this.esHoraValida = true;
    }

   
    const correosArray = this.correos.split(',').map((correo) => correo.trim());
    const correosInvalidos = correosArray.filter((correo) => !this.esCorreoValidoFormato(correo));
    if (correosInvalidos.length > 0) {
      this.esCorreoValido = false;
      this.mostrarAlerta('Por favor, ingrese correos válidos.', 'error');
      return;
    } else {
      this.esCorreoValido = true;
    }

    const usuario = this.storageService.obtenerUsuario();
    if (usuario) {
      this.recordatorio.usuario_id = usuario.usuario_id;
    } else {
      console.error('Usuario no encontrado.');
      return;
    }

    this.recordatorio.correo_destinatario = correosArray;

    const fechaISO = new Date(this.recordatorio.fecha_hora).toISOString();
    this.recordatorio.fecha_hora = fechaISO;

    this.recordatoriosService.createRecordatorio(this.recordatorio).subscribe(
      (respuesta) => {
        this.mostrarAlerta('¡Recordatorio creado con éxito!', 'exito');
        setTimeout(() => {
          this.resetForm();
          this.cerrar.emit(); 
        }, 1000); 
      },
      (error) => {
        console.error('Error al crear el recordatorio:', error);
        this.mostrarAlerta('Hubo un error al crear el recordatorio.', 'error');
      }
    );
  }

  esCorreoValidoFormato(correo: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo);
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
      correo_destinatario: [],
    };
    this.correos = '';
    this.formSubmitted = false; 
    this.esHoraValida = true;
    this.esCorreoValido = true;
  }

  mostrarAlerta(mensaje: string, estilo: string): void {
    this.alerta = { mensaje, estilo };
    setTimeout(() => {
      this.alerta = null; 
    }, 3000);
  }
}
