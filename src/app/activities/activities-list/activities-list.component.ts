import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Activities } from '../interfaces/activities';
import { ActivitiesService } from '../service/activities.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css'],
})
export class ActivitiesListComponent implements OnInit, OnChanges {
  @Input() searchTerm: string = '';
  actividades: Activities[] = [];
  actividadesFiltradas: Activities[] = [];
  actividadesMostradas: number = 5;
  mostrarFormulario: boolean = false;
  actividadSeleccionada: Activities | null = null;
  modalEditarActivo: boolean = false;
  modalEliminarActivo: boolean = false;
  menuActivo: number | null = null;

  constructor(
    private actividadService: ActivitiesService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.cargarActividades();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.filtrarActividades();
    }
  }

  cargarActividades(): void {
    const usuario = this.storageService.obtenerUsuario();
    const usuario_id = usuario?.usuario_id;

    if (usuario_id) {
      this.actividadService.getActividad(usuario_id).subscribe({
        next: (data) => {
          this.actividades = data.filter(
            (actividad) => actividad.nombre && actividad.fecha_inicio
          );
          this.filtrarActividades();
        },
        error: (err) => {
          console.error('Error al cargar actividades:', err);
        },
      });
    } else {
      console.error('Usuario no encontrado o no tiene un usuario_id');
    }
  }

  filtrarActividades(): void {
    const term = this.searchTerm.toLowerCase();
    this.actividadesFiltradas = this.actividades.filter((actividad) =>
      actividad.nombre.toLowerCase().includes(term)
    );
    this.actividadesMostradas = 5;
  }

  agregarActividad(actividad: Activities): void {
    this.actividades.push(actividad); // Agrega a la lista original
    this.filtrarActividades(); // Actualiza la lista filtrada
  }
  

  verMas(): void {
    this.actividadesMostradas += 5;
  }

  editarActividad(actividad: Activities): void {
    this.actividadSeleccionada = actividad;
    this.modalEditarActivo = true;
  }

  eliminarActividad(actividad: Activities): void {
    this.actividadSeleccionada = actividad;
    this.modalEliminarActivo = true;
  }

  cerrarModalEditar(): void {
    this.modalEditarActivo = false;
    this.actividadSeleccionada = null;
  }

  cerrarModalEliminar(): void {
    this.modalEliminarActivo = false;
    this.actividadSeleccionada = null;
  }

  actualizarActividad(actividadEditada: Activities): void {
    const index = this.actividades.findIndex(
      (act) => act.actividad_id === actividadEditada.actividad_id
    );
    if (index !== -1) {
      this.actividades[index] = actividadEditada;
      this.filtrarActividades();
    }
  }

  eliminarActividadConfirmada(id: number): void {
    this.actividadesFiltradas = this.actividadesFiltradas.filter(
      (actividad) => actividad.actividad_id !== id
    );
    this.cerrarModalEliminar();
  }

  toggleMenu(actividad: Activities): void {
    this.menuActivo = this.menuActivo === actividad.actividad_id ? null : actividad.actividad_id;
  }

  seleccionarActividadParaEditar(actividad: Activities): void {
    this.actividadSeleccionada = { ...actividad };
    this.modalEditarActivo = true;
  }
}

