import { Component } from '@angular/core';
import { faSearch} from '@fortawesome/free-solid-svg-icons';;
import { Activities } from '../interfaces/activities';
import { ActivitiesService } from '../service/activities.service';
@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrl: './activities-page.component.css'
})
export class ActivitiesPageComponent {
  faSearch = faSearch;

  constructor(private actividadservice:ActivitiesService){}
  onActividadcreada(actividad:Activities ){
    this.actividadservice.createActividad(actividad).subscribe(()=>{
      
    }
    )
  } 

  modalAbierto = false;

  abrirModal() {
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }
}
