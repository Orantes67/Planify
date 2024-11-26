import { Component, OnInit } from '@angular/core';
import { RecordatoriosService } from '../recordatorios.service';
import { Recordatorio } from '../interfaces/recordatorio';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-reminder-page',
  templateUrl: './reminder-page.component.html',
  styleUrl: './reminder-page.component.css',
})
export class ReminderPageComponent implements OnInit {
  constructor(
    private recordatorioservice: RecordatoriosService,
    private storageservice: StorageService
  ) {}
  recordatoriosFamily: Recordatorio[] = [];
  recordatoriosPersonal: Recordatorio[] = [];

  ngOnInit(): void {
    this.cargarRecordatorios();
  }
  cargarRecordatorios() {
    this.recordatorioservice
      .getNotificacionesPorCategoria(
        'familia',
        this.storageservice.obtenerUsuario().usuario_id
      )
      .subscribe((data) => {
        this.recordatoriosFamily = data;
        console.log(data);
      });
    this.recordatorioservice
      .getNotificacionesPorCategoria(
        'personal',
        this.storageservice.obtenerUsuario().usuario_id
      )
      .subscribe((data) => {
        this.recordatoriosPersonal = data;
        console.log(data);
      });
  }

  modalAbierto = false;

  abrirModal() {
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }
}
