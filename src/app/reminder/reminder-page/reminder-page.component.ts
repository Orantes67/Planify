import { Component, OnInit } from '@angular/core';
import { RecordatoriosService } from '../recordatorios.service';
import { Recordatorio } from '../interfaces/recordatorio';

@Component({
  selector: 'app-reminder-page',
  templateUrl: './reminder-page.component.html',
  styleUrl: './reminder-page.component.css'
})
export class ReminderPageComponent  {
  
  constructor(private recordatorioservice:RecordatoriosService){}
//aqui
  onRecordatorioCreado(recordatorio: Recordatorio){
    this.recordatorioservice.createRecordatorio(recordatorio).subscribe(()=>{
      //this.cargarRecordatorios();
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
