import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Recordatorio } from '../../interfaces/recordatorio';
import { RecordatoriosService } from '../../recordatorios.service';

@Component({
  selector: 'app-modal-reminder-edit',
  templateUrl: './modal-reminder-edit.component.html',
  styleUrls: ['./modal-reminder-edit.component.css']
})
export class ModalReminderEditComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Input() recordatorioCreado!: Recordatorio;
  correos: string = '';
  alerta: { mensaje: string; estilo: string } | null = null; 
  esHoraValida: boolean = true; 
  esCorreoValido: boolean = true; 

  constructor(private recordatoriosService: RecordatoriosService) {}

  editarRecordatorio() {
    const horaActual = new Date();
    const horaLimite = new Date(this.recordatorioCreado.fecha_hora);
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

    const fechaISO = new Date(this.recordatorioCreado.fecha_hora).toISOString();
    this.recordatorioCreado.fecha_hora = fechaISO;

    this.recordatoriosService.updateRecordatorio(this.recordatorioCreado).subscribe(
      () => {
        this.mostrarAlerta('¡Recordatorio editado con éxito!', 'exito');
        setTimeout(() => {
          this.cerrar.emit(); 
        }, 1000);
      },
      (error) => {
        console.error('Error al editar el recordatorio:', error);
        this.mostrarAlerta('Hubo un error al editar el recordatorio.', 'error');
      }
    );
  }

  esCorreoValidoFormato(correo: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo);
  }

  mostrarAlerta(mensaje: string, estilo: string): void {
    this.alerta = { mensaje, estilo };
    setTimeout(() => {
      this.alerta = null; 
    }, 3000);
  }
}
