import { Component, OnInit } from '@angular/core';
import { RecordatoriosService } from '../recordatorios.service';
import { Recordatorio } from '../interfaces/recordatorio';

@Component({
  selector: 'app-reminder-page',
  templateUrl: './reminder-page.component.html',
  styleUrl: './reminder-page.component.css'
})
export class ReminderPageComponent implements OnInit {
  recordatorio: Recordatorio[]=[]
  constructor(private recordatorioservice:RecordatoriosService){}
  ngOnInit(): void {
      this.cargarRecordatorios()
  }
  cargarRecordatorios(){
    this.recordatorioservice.getRecordatorios().subscribe(data=>{
      console.log(data)
    }
    )
  }

  onRecordatorioCreado(recordatorio: Recordatorio){
    this.recordatorioservice.createRecordatorio(recordatorio).subscribe(()=>{
      this.cargarRecordatorios();
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
