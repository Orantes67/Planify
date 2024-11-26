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

  fechaFinInvalida = false;
  horaFinInvalida = false;

  actividad: Activities = {
    nombre: '',
    fecha_inicio: '',
    hora_inicio: '',
    fecha_fin: '',
    hora_fin: '',
    categoria: '',
    usuario_id:0,
    familia_id: 0,
    actividad_id: 0,
  };


  constructor(private actividadService: ActivitiesService) {}

  editarActividad(): void {
    if (this.validarFechasYHoras() && this.validarCampos()) {
      
      this.actividadService.updateActividad(this.actividad.actividad_id, this.actividad).subscribe({
        next: (actividadActualizada) => {
          this.ActividadEditada.emit(actividadActualizada); 
          this.cerrar.emit(); 
        },
        error: (err) => {
          console.error('Error al actualizar la actividad:', err);
         
        }
      });
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges triggered', changes);
    if (changes['actividadSeleccionada'] && this.actividadSeleccionada) {
      this.actividad = { ...this.actividadSeleccionada }; 
      console.log('Actividad cargada:', this.actividad);
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
      return false;
    } else {
      this.fechaFinInvalida = false;
    }

    if (horaFin < horaInicio) {
      this.horaFinInvalida = true;
      return false;
    } else {
      this.horaFinInvalida = false;
    }

    return true;
  }

 
}
