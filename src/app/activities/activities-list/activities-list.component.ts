import { Component,OnInit } from '@angular/core';
import { Activities } from '../interfaces/activities';
import { ActivitiesService } from '../service/activities.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrl: './activities-list.component.css'
})
export class ActivitiesListComponent implements OnInit {
  actividades: Activities[] = []; 
  mostrarFormulario: boolean = false;

  constructor(private actividadservice: ActivitiesService) {}

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades(): void {
    this.actividadservice.getActividad().subscribe((data) => {
      this.actividades = data; 
      console.log(data);
    });
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }
}

