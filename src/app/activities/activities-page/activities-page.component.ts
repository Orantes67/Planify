import { Component } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Activities } from '../interfaces/activities';

@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.css'],
})
export class ActivitiesPageComponent {
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
    
  }

  onSearchTermChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value; 
  }
}
