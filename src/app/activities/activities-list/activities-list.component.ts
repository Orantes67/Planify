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
  usuario_id: number | null = null;
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
    this.obtenerUsuarioId();
    this.cargarActividadesDesdeLocalStorage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.filtrarActividades();
    }
  }

  obtenerUsuarioId(): void {
    const usuario = this.storageService.obtenerUsuario();
    this.usuario_id = usuario?.usuario_id || null;

    if (!this.usuario_id) {
      console.error('Usuario no encontrado o no tiene un usuario_id');
    }
  }

  cargarActividadesDesdeLocalStorage(): void {
    const actividadesGuardadas = localStorage.getItem('actividades');
    if (actividadesGuardadas) {
      this.actividades = JSON.parse(actividadesGuardadas);
      this.filtrarActividades();
    } else {
      this.cargarActividadesDesdeServicio();
    }
  }

  cargarActividadesDesdeServicio(): void {
    this.actividadService.getActividad().subscribe({
      next: (data) => {
        if (this.usuario_id) {
          this.actividades = data.filter(
            (actividad) => actividad.familia_id === this.usuario_id
          );
          this.guardarActividadesEnLocalStorage();
          this.filtrarActividades();
        } else {
          this.actividades = [];
          console.warn('No se encontraron actividades para el usuario');
        }
      },
      error: (err) => {
        console.error('Error al cargar actividades:', err);
      },
    });
  }

  guardarActividadesEnLocalStorage(): void {
    localStorage.setItem('actividades', JSON.stringify(this.actividades));
  }

  filtrarActividades(): void {
    const term = this.searchTerm.toLowerCase();
    this.actividadesFiltradas = this.actividades.filter((actividad) =>
      actividad.nombre.toLowerCase().includes(term)
    );
    this.actividadesMostradas = 5;
  }

  agregarActividad(actividad: Activities): void {
    this.actividades.push(actividad);
    this.guardarActividadesEnLocalStorage();
    this.filtrarActividades();
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
      this.guardarActividadesEnLocalStorage(); 
      this.filtrarActividades(); 
    }
  }
  

  eliminarActividadConfirmada(id: number): void {
    this.actividades = this.actividades.filter(
      (actividad) => actividad.actividad_id !== id
    );
    this.guardarActividadesEnLocalStorage();
    this.filtrarActividades();
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
  