import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Activities } from '../../interfaces/activities';
import { ActivitiesService } from '../../service/activities.service';

@Component({
  selector: 'app-modal-from-update-activities',
  templateUrl: './modal-from-update-activities.component.html',
  styleUrls: ['./modal-from-update-activities.component.css']
})
export class ModalFromUpdateActivitiesComponent implements OnChanges {

  @Input() actividadSeleccionada: Activities | null = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() ActividadEditada = new EventEmitter<Activities>();

  touched = {
    nombre: false,
    fecha_inicio: false,
    hora_inicio: false,
    fecha_fin: false,
    hora_fin: false,
    categoria: false
  };

  alerta: { mensaje: string; estilo: 'exito' | 'error' } | null = null;
  fechaFinInvalida = false;
  horaFinInvalida = false;
  formSubmitted = false;

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

  constructor(private actividadService: ActivitiesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actividadSeleccionada'] && this.actividadSeleccionada) {
      this.actividad = { ...this.actividadSeleccionada }; 
      this.fechaFinInvalida = false;
      this.horaFinInvalida = false;
      this.touched = {
        nombre: false,
        fecha_inicio: false,
        hora_inicio: false,
        fecha_fin: false,
        hora_fin: false,
        categoria: false,
      };
    }
  }

  // Validar si todos los campos están completos
  validarCampos(): boolean {
    return (
      this.actividad.nombre.trim() !== '' &&
      this.actividad.fecha_inicio.trim() !== '' &&
      this.actividad.hora_inicio.trim() !== '' &&
      this.actividad.fecha_fin.trim() !== '' &&
      this.actividad.hora_fin.trim() !== '' &&
      this.actividad.categoria.trim() !== ''
    );
  }

  // Validar fechas y horas de la actividad
  validarFechasYHoras(): boolean {
    const fechaInicio = new Date(this.actividad.fecha_inicio);
    const fechaFin = new Date(this.actividad.fecha_fin);

    const [horaInicioH, horaInicioM] = this.actividad.hora_inicio.split(':').map(Number);
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

  // Función para editar la actividad
  editarActividad(): void {
    this.formSubmitted = true; // Habilita la validación al enviar el formulario

    // Si las fechas o los campos no son válidos, no se continúa
    if (!this.validarFechasYHoras() || !this.validarCampos()) {
      return;
    }

    // Llamada al servicio para actualizar la actividad
    this.actividadService.updateActividad(this.actividad.actividad_id, this.actividad).subscribe({
      next: (actividadActualizada) => {
        this.alerta = { mensaje: '¡Actividad actualizada con éxito!', estilo: 'exito' };
        
        // Después de 2 segundos, resetear el formulario
        setTimeout(() => {
          this.ActividadEditada.emit(actividadActualizada); 
          this.resetForm();
          this.cerrar.emit(); // Cierra el modal

        }, 1000);
      },
      error: (err) => {
        console.error('Error al actualizar la actividad:', err);
        this.alerta = { mensaje: 'Error al actualizar la actividad, por favor intente nuevamente.', estilo: 'error' };
      }
    });
  }

  // Función para resetear el formulario después de un envío exitoso
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
    this.formSubmitted = false; // Resetea la bandera para permitir la validación en futuros envíos
  }
}
