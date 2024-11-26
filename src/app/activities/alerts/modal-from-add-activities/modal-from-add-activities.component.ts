import { Component, Output, EventEmitter } from '@angular/core';
import { Activities } from '../../interfaces/activities';
import { ActivitiesService } from '../../service/activities.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-modal-from-add-activities',
  templateUrl: './modal-from-add-activities.component.html',
  styleUrls: ['./modal-from-add-activities.component.css'],
})
export class ModalFromAddActivitiesComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Output() ActividadCreada = new EventEmitter<Activities>();

  actividad: Activities = {
    nombre: '',
    fecha_inicio: '',
    hora_inicio: '',
    fecha_fin: '',
    hora_fin: '',
    categoria: '',
    usuario_id: 0,
    familia_id: 0,
    actividad_id: 0,
  };

  alerta: { mensaje: string; estilo: 'exito' | 'error' } | null = null;
  fechaFinInvalida = false;
  horaFinInvalida = false;
  formSubmitted = false;

  constructor(
    private actividadService: ActivitiesService,
    private storageService: StorageService
  ) {}

  // Validación de los campos del formulario
  validarCampos(): boolean {
    if (
      this.actividad.nombre.trim() === '' ||
      this.actividad.fecha_inicio.trim() === '' ||
      this.actividad.hora_inicio.trim() === '' ||
      this.actividad.fecha_fin.trim() === '' ||
      this.actividad.hora_fin.trim() === '' ||
      this.actividad.categoria.trim() === ''
    ) {
      this.alerta = { mensaje: 'Todos los campos son obligatorios.', estilo: 'error' };
      return false;
    }
    return true;
  }

  // Validación de las fechas y horas
  validarFechasYHoras(): boolean {
    const fechaInicio = new Date(this.actividad.fecha_inicio);
    const fechaFin = new Date(this.actividad.fecha_fin);

    const [horaInicioH, horaInicioM] = this.actividad.hora_inicio
      .split(':')
      .map(Number);
    const [horaFinH, horaFinM] = this.actividad.hora_fin.split(':').map(Number);

    const horaInicio = new Date(fechaInicio);
    horaInicio.setHours(horaInicioH, horaInicioM, 0, 0);

    const horaFin = new Date(fechaFin);
    horaFin.setHours(horaFinH, horaFinM, 0, 0);

    if (fechaFin < fechaInicio) {
      this.fechaFinInvalida = true;
      this.alerta = { mensaje: 'La fecha de fin no puede ser anterior a la de inicio.', estilo: 'error' };
      return false;
    } else {
      this.fechaFinInvalida = false;
    }

    if (horaFin < horaInicio) {
      this.horaFinInvalida = true;
      this.alerta = { mensaje: 'La hora de fin no puede ser anterior a la de inicio.', estilo: 'error' };
      return false;
    } else {
      this.horaFinInvalida = false;
    }

    return true;
  }

  // Método para crear la actividad
  crearActividad(): void {
    this.formSubmitted = true;  // Se activa la validación al enviar el formulario

    if (!this.validarFechasYHoras() || !this.validarCampos()) {
      return;  // Si alguna validación falla, no se realiza el envío
    }

    this.actividad.usuario_id = this.storageService.obtenerUsuario().usuario_id;

    // Llamada al servicio para crear la actividad
    this.actividadService.createActividad(this.actividad).subscribe({
      next: (response) => {
        console.log('Actividad creada exitosamente:', response);
        this.alerta = { mensaje: '¡Actividad creada con éxito!', estilo: 'exito' };
        setTimeout(() => {
          this.ActividadCreada.emit(response);
          this.resetForm();
          this.cerrar.emit();
        }, 1000); // Cierra el modal después de 2 segundos
      },
      error: (err) => {
        console.error('Error al crear la actividad:', err);
        this.alerta = { mensaje: 'Error al crear la actividad, por favor intente nuevamente.', estilo: 'error' };
      },
    });
  }

  // Resetear el formulario
  resetForm(): void {
    this.actividad = {
      nombre: '',
      fecha_inicio: '',
      hora_inicio: '',
      fecha_fin: '',
      hora_fin: '',
      categoria: '',
      usuario_id: 0,
      familia_id: 0,
      actividad_id: 0,
    };
    this.fechaFinInvalida = false;
    this.horaFinInvalida = false;
    this.alerta = null;
    this.formSubmitted = false;  // Reseteamos el estado de la validación
  }
}
