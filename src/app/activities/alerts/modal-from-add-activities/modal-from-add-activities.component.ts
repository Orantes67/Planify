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
    familia_id: 0,
    actividad_id: 0,
  };

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

  constructor(
    private actividadService: ActivitiesService,
    private storageService: StorageService
  ) {}

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

  crearActividad(): void {
    if (!this.validarFechasYHoras()) {
      console.log('La fecha o la hora de fin no son válidas');
      return;
    }

    const usuario = this.storageService.obtenerUsuario();
    console.log('Usuario obtenido de localStorage:', usuario);

    if (!usuario) {
      console.error('No se encontró ningún usuario almacenado en localStorage.');
      return;
    }

    if (usuario.roles && usuario.roles.length > 0 && usuario.roles[0].familia_id) {
      this.actividad.familia_id = usuario.roles[0].familia_id;
    } else {
      console.error('No se encontró familia_id en los roles del usuario:', usuario.roles);
      return;
    }

    this.actividadService.createActividad(this.actividad).subscribe({
      next: (response) => {
        console.log('Actividad creada exitosamente:', response);
        this.ActividadCreada.emit(response);
        this.resetForm();
        this.cerrar.emit();
      },
      error: (err) => {
        console.error('Error al crear la actividad:', err);
      },
    });
  }

  resetForm(): void {
    this.actividad = {
      nombre: '',
      fecha_inicio: '',
      hora_inicio: '',
      fecha_fin: '',
      hora_fin: '',
      categoria: '',
      familia_id: 0,
      actividad_id: 0,
    };
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
