import { Component, OnInit } from '@angular/core';
import { RecordatoriosService } from '../recordatorios.service';
import { Recordatorio } from '../interfaces/recordatorio';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-incoming-activities',
  templateUrl: './incoming-activities.component.html',
  styleUrl: './incoming-activities.component.css',
})
export class IncomingActivitiesComponent implements OnInit {
  notificaciones: Recordatorio[] = [];
  usuarioId: number | undefined;
  constructor(
    private servicioNotificaciones: RecordatoriosService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.usuarioId = this.storage.obtenerUsuario().usuario_id;
    this.servicioNotificaciones
      .getNotificacionesProximas(this.usuarioId)
      .subscribe(
        (data) => {
          this.notificaciones = data; // Asignar las notificaciones recibidas
        },
        (error) => {
          console.error('Error al obtener notificaciones:', error);
        }
      );
  }
}
