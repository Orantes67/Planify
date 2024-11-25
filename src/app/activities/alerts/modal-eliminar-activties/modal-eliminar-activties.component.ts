import { Component,Input,Output,EventEmitter } from '@angular/core';
import { ActivitiesService } from '../../service/activities.service';
import { Activities } from '../../interfaces/activities';
@Component({
  selector: 'app-modal-eliminar-activties',
  templateUrl: './modal-eliminar-activties.component.html',
  styleUrls: ['./modal-eliminar-activties.component.css'], // Corrección
})
export class ModalEliminarActivtiesComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Input() actividadCreada!: Activities;
  @Output() ActividadDelete = new EventEmitter<number>();

  constructor(private activitiesService: ActivitiesService) {}

  deteleActividad(): void {
  if (this.actividadCreada?.actividad_id) {
    this.activitiesService.deleteActividad(this.actividadCreada.actividad_id).subscribe({
      next: () => {
        this.ActividadDelete.emit(this.actividadCreada.actividad_id); // Emitimos el ID eliminado
        this.cerrar.emit(); // Cerramos el modal
      },
      error: (err) => console.error('Error al eliminar la actividad:', err),
    });
  }
}

}
