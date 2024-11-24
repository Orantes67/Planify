import { Component,Output,EventEmitter } from '@angular/core';
import { Activities } from '../../interfaces/activities';
import { ActivitiesService } from '../../service/activities.service';

@Component({
  selector: 'app-modal-from-add-activities',
  templateUrl: './modal-from-add-activities.component.html',
  styleUrl: './modal-from-add-activities.component.css'
})
export class ModalFromAddActivitiesComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Output() ActividadCreada = new EventEmitter<Activities>();
  constructor( private actividadService:ActivitiesService){}

  actividad: Activities ={
    nombre: '',
    fecha_inicio: '',
    hora_inicio: '',
    fecha_fin: '',
    hora_fin: '',
    categoria: '',
    familia_id: 0 ,
    actividad_id: 0
  }

  touched = {
    nombre: false,
    fecha_inicio: false,
    hora_inicio: false,
    fecha_fin: false,
    hora_fin: false,
  };
  validarCampos(): boolean {
    return (
      this.actividad.nombre.trim() !== '' &&
      this.actividad.fecha_inicio.trim() !== '' &&
      this.actividad.hora_inicio.trim() !== '' &&
      this.actividad.fecha_fin.trim() !== '' &&
      this.actividad.hora_fin.trim() !== ''
    );
  }
  crearActividad():void{
    console.log('Nuevo Recordatorio:', this.actividad);
    this.ActividadCreada.emit(this.actividad);
    this.resetForm();
    this.cerrar.emit(); 
  }
  resetForm(): void{
    this.actividad = {
      nombre: '',
      fecha_inicio: '',
      hora_inicio: '',
      fecha_fin: '',
      hora_fin: '',
      categoria: '',
      familia_id: 0 ,
      actividad_id: 0
  };
  
  }

  
}
