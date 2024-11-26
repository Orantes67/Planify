import { Component, ViewChild } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Activities } from '../interfaces/activities';
import { ActivitiesListComponent } from '../activities-list/activities-list.component';

@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.css'],
})
export class ActivitiesPageComponent {
  @ViewChild(ActivitiesListComponent) activitiesListComponent!: ActivitiesListComponent;

  faSearch = faSearch;
  modalAbierto = false;
  searchTerm: string = ''; 

  abrirModal() {
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  onActividadcreada(actividad: Activities) {
    console.log('Actividad recibida desde el hijo:', actividad);
    this.activitiesListComponent.agregarActividad(actividad);
    this.cerrarModal();
  }

  onSearchTermChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value; 
  }
}

