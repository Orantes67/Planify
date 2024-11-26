import { Component, OnInit, Input } from '@angular/core';
import { Recordatorio } from '../interfaces/recordatorio';
import { RecordatoriosService } from '../recordatorios.service';
import { StorageService } from '../../services/storage.service';
import { iif } from 'rxjs';
@Component({
  selector: 'app-reminder-dashboard',
  templateUrl: './reminder-dashboard.component.html',
  styleUrl: './reminder-dashboard.component.css',
})
export class ReminderDashboardComponent implements OnInit {
  recordatorios: Recordatorio[] = [];
  recordatoriosFamily: Recordatorio[] = [];
  recordatoriosPersonal: Recordatorio[] = [];
  mostrarFormularioFamily: boolean = false;
  mostrarFormularioPersonal: boolean = false;
  constructor(
    private recordatorioservice: RecordatoriosService,
    private storageservice: StorageService
  ) {}

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
    this.recordatorioservice.getRecordatorios().subscribe((data) => {
      this.recordatorios = data;
      console.log(data);
    });
  }

  cargarRecordatoriosPorCategoria() {}

  toggleFormulario(id: number): void {
    if (id == 2) {
      this.mostrarFormularioPersonal = !this.mostrarFormularioPersonal;
    } else if (id == 1) {
      this.mostrarFormularioFamily = !this.mostrarFormularioFamily;
    }
  }

  modalAbiertoEditar = false;
  modalAbiertoDelete = false;
  recordatorioSeleccionado!: Recordatorio;
  abrirModal(recordatorio: Recordatorio, id: number) {
    this.recordatorioSeleccionado = { ...recordatorio };
    if (id == 1) {
      this.modalAbiertoEditar = true;
    } else if (id == 2) {
      this.modalAbiertoDelete = true;
    }
  }

  cerrarModal() {
    this.cargarRecordatorios();
    this.modalAbiertoEditar = false;
    this.modalAbiertoDelete = false;
  }
}
