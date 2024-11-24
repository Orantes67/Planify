import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Activities } from '../../interfaces/activities';
import { ActivitiesService } from '../../service/activities.service';

@Component({
  selector: 'app-modal-from-update-activities',
  templateUrl: './modal-from-update-activities.component.html',
  styleUrl: './modal-from-update-activities.component.css',
})
export class ModalFromUpdateActivitiesComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Input() actividadCreada!: Activities; 
  @Input() actividadId!: number; 

  constructor(private actividadService: ActivitiesService) {}

  editarActividad() {
    if (!this.actividadId || !this.actividadCreada) {
      console.error('Faltan datos para actualizar la actividad.');
      return;
    }

    console.log('Editando actividad:', this.actividadId, this.actividadCreada);
    this.actividadService.updateActividad(this.actividadId, this.actividadCreada)
      .subscribe(
        (response) => {
          console.log('Actividad actualizada exitosamente:', response);
          this.cerrar.emit(); 
        },
        (error) => {
          console.error('Error al actualizar la actividad:', error);
        }
      );
  }
}
